'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Interface } from 'ethers'
import toast from 'react-hot-toast'
import { useNetwork } from 'wagmi'
import schema, { type ConfirmFormValues } from './schema'
import { useFormStore } from '@/modules/create-community'
import ConfirmDropDown from './ConfirmDropDown'
import ConfirmItem from './ConfirmItem'
import ConfirmTitle from './ConfirmTitle'
import ConfirmCheckbox from './ConfirmCheckbox'
import ContinueButton from '@/modules/ContinueButton'
import { walletSnippet } from '@/utils/helpers'
import { IPFSImage } from '@/components/ipfs/IPFSImage'
import { partyFactoryAbi } from '@/data/contract/abis/PartyFactory'
import useCreateParty from '@/hooks/useCreateParty'

const DEPLOYMENT_ERROR = {
  MISSING_IPFS_ARTWORK: `Oops! It looks like your artwork wasn't correctly uploaded to ipfs. Please go back to the artwork step to re-upload your artwork before proceeding.`,
  MISMATCHING_SIGNER:
    'Oops! It looks like the founder address submitted is different than the current signer address. Please go back to the allocation step and re-submit the founder address.',
  NO_FOUNDER:
    'Oops! It looks like you have no founders set. Please go back to the allocation step and add at least one founder address.',
  GENERIC:
    'Oops! Looks like there was a problem handling the dao deployment. Please ensure that input data from all the previous steps is correct',
  INVALID_ALLOCATION_PERCENTAGE:
    'Oops! Looks like there are undefined founder allocation values. Please go back to the allocation step to ensure that valid allocation values are set.',
  MISMATCHING_NETWORK: 'Oops! Looks like there is a chain mismatch.',
}

export function ConfirmForm(): JSX.Element {
  const { chain } = useNetwork()
  const { createParty } = useCreateParty()
  const {
    founderAllocation,
    contributionAllocation,
    general,
    auctionSettings,
    setActiveSection,
    activeSection,
    setDeployedDao,
    ipfsUpload,
    setFulfilledSections,
  } = useFormStore()

  const [isPendingTransaction, setIsPendingTransaction] =
    useState<boolean>(false)
  const [deploymentError, setDeploymentError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const methods = useForm<ConfirmFormValues>({
    defaultValues: {
      confirm: false,
    },
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const handleDeploy = async () => {
    setIsLoading(true)
    setDeploymentError(undefined)

    if (
      [...founderAllocation, ...contributionAllocation].find(
        (founder) => typeof founder.allocationPercentage === 'undefined'
      )
    ) {
      setDeploymentError(DEPLOYMENT_ERROR.INVALID_ALLOCATION_PERCENTAGE)
      return
    }

    if (ipfsUpload.length === 0) {
      setDeploymentError(DEPLOYMENT_ERROR.MISSING_IPFS_ARTWORK)
      return
    }

    setIsPendingTransaction(true)
    const transaction = await createParty()
    const error = (transaction as any)?.error
    if (error) {
      if ((error as any).name === 'ChainMismatchError') {
        setDeploymentError(DEPLOYMENT_ERROR.MISMATCHING_NETWORK)
      } else {
        setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      }
      setIsLoading(false)
      setIsPendingTransaction(false)
      return
    }

    const managerInterface = new Interface(partyFactoryAbi)

    //keccak256 hashed value of DAODeployed(address,address,address,address,address)
    console.log('SWEETS SUCCESSFUL TX', transaction)
    const deployEvent = (transaction as any)?.logs.find(
      (log: any) =>
        log?.topics[0]?.toLowerCase() ===
        '0x2c83cc7f2e67cf5f6cc54d64518c7769f402efa96e5e1b24cfab3cfbdca271ea'
    )
    console.log('SWEETS deployEvent', deployEvent)

    let parsedEvent
    try {
      // WHAT ARE WE DOING WITH EVENT?
      parsedEvent = managerInterface.parseLog({
        topics: deployEvent?.topics || [],
        data: deployEvent?.data || '',
      })
    } catch {}
    console.log('SWEETS parsedEvent', parsedEvent)

    const deployedAddresses = parsedEvent?.args

    if (!deployedAddresses) {
      setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      setIsPendingTransaction(false)
      return
    }

    setDeployedDao({
      token: deployedAddresses[0],
    })

    if (deployedAddresses) {
      toast.remove()
      toast.success('DAO Deployed!')
    }

    setIsPendingTransaction(false)
    setIsLoading(false)
    setFulfilledSections('DAO DONE') // TODO:: remove hardcode or edit?
    console.log('big success...')
    setActiveSection(activeSection + 1)
  }

  useEffect(() => {
    if (isPendingTransaction) {
      toast.loading('Deploying DAO...')
    }
    if (deploymentError) {
      toast.dismiss()
      toast.error(deploymentError)
      setIsLoading(false)
    }
  }, [isPendingTransaction, deploymentError])

  const { days, hours, minutes } = auctionSettings.auctionDuration

  return (
    <FormProvider {...methods}>
      <p className="mb-6 mt-4 text-left text-grey md:mt-16">
        Make sure your community details are correct before approving. These can
        only be changed later via a community vote.
      </p>
      <form onSubmit={handleSubmit(handleDeploy)}>
        <ConfirmDropDown text="General Info">
          <div className="px-4 py-6 ">
            <div>
              <ConfirmTitle>DAO AVATAR</ConfirmTitle>
              <div className="mt-2">
                <IPFSImage
                  src={general.daoAvatar as any}
                  alt="dao avatar"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full"
                />
              </div>
            </div>
            <ConfirmItem label="DAO NAME">{general.daoName}</ConfirmItem>
            <ConfirmItem label="DAO SYMBOL">{general.daoSymbol}</ConfirmItem>
            <ConfirmItem label="DAO WEBSITE">{general.daoWebsite}</ConfirmItem>
          </div>
        </ConfirmDropDown>
        <ConfirmDropDown text="Auction Settings">
          <div className="px-4 py-6 ">
            <ConfirmItem label="Auction Duration">
              {`
                ${days} day${days === 1 ? '' : 's'},
                ${hours} hour${hours === 1 ? '' : 's'} &
                ${minutes} minute${minutes === 1 ? '' : 's'}.
              `}
            </ConfirmItem>
            <ConfirmItem label="Auction Reserve Price">
              {general.daoSymbol}
            </ConfirmItem>
            <ConfirmItem label="Proposal Threshold">
              {auctionSettings.proposalThreshold} %
            </ConfirmItem>
            <ConfirmItem label="Quorum Threshold">
              {auctionSettings.quorumThreshold} %
            </ConfirmItem>
          </div>
        </ConfirmDropDown>
        <ConfirmDropDown text="Allocation">
          <div className="px-4 py-6 ">
            <ConfirmItem label="FOUNDER ALLOCATION">
              {`
                ${walletSnippet(
                  founderAllocation[0].founderAddress
                )} will receive
                ${founderAllocation[0].allocationPercentage} % of Tokens, until
                ${founderAllocation[0].endDate}.
              `}
            </ConfirmItem>
          </div>
        </ConfirmDropDown>
        <div className="mt-10">
          {/* <ConfirmCheckbox name="termsAcceptance">
            I have reviewed and acknowledge and agree to the{' '}
            <Link href="#" className="text-orange">
              FAM Terms of Service
            </Link>
          </ConfirmCheckbox> */}
          <ConfirmCheckbox name="deployDaoAcceptance">
            I am deploying my DAO on{' '}
            <Link href="#" className="text-orange">
              {chain?.name}
            </Link>
          </ConfirmCheckbox>
        </div>
        <ContinueButton title="Confirm 1/2" loading={isLoading} />
      </form>
    </FormProvider>
  )
}
