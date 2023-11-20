// Framework
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Third Parties
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AbiCoder, hexlify, Interface } from 'ethers'
import { getAddress, parseEther } from 'viem'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import toast from 'react-hot-toast'
import {
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'

// Schemas
import schema, { type ConfirmFormValues } from './schema'

// Components
import { useFormStore } from '@/modules/create-community'
import { Button } from '@/components/shared'
import DropDown from './Dropdown'
import ConfirmItem from './ConfirmItem'
import ConfirmTitle from './ConfirmTitle'
import ConfirmCheckbox from './ConfirmCheckbox'
import ContinueButton from '@/modules/ContinueButton'
import { sanitizeStringForJSON } from '@/utils/sanitize'
import { toSeconds } from '@/utils/helpers'

// Constants
import { PUBLIC_MANAGER_ADDRESS } from '@/constants/addresses'
import { NULL_ADDRESS } from '@/constants/addresses'
import { managerAbi } from '@/data/contract/abis'

import type { AddressType } from '@/typings'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

type FounderParameters = NonNullable<
  WriteContractUnpreparedArgs<typeof managerAbi, 'deploy'>
>['args'][0]

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
}

export function ConfirmForm(): JSX.Element {
  const {
    founderAllocation,
    contributionAllocation,
    general,
    auctionSettings,
    setUpArtwork,
    setActiveSection,
    activeSection,
    setDeployedDao,
    ipfsUpload,
    setFulfilledSections,
    vetoPower,
    vetoerAddress,
  } = useFormStore()

  const [isPendingTransaction, setIsPendingTransaction] =
    useState<boolean>(false)
  const [deploymentError, setDeploymentError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const chain = 5 //useChainStore((x) => x.chain) - TODO: get chain from store???
  const { wallet: activeWallet } = usePrivyWagmi()

  console.log('activeWallet::', activeWallet)

  const methods = useForm<ConfirmFormValues>({
    defaultValues: {
      confirm: false,
    },
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const founderParams: FounderParameters = [
    ...founderAllocation,
    ...contributionAllocation,
  ].map(({ founderAddress, allocationPercentage: allocation, endDate }) => ({
    wallet: founderAddress as AddressType,
    ownershipPct: allocation ? BigInt(allocation) : BigInt(0),
    vestExpiry: BigInt(Math.floor(new Date(endDate).getTime() / 1000)),
  }))

  const abiCoder = new AbiCoder()
  const tokenParamsHex = abiCoder.encode(
    ['string', 'string', 'string', 'string', 'string', 'string'],
    [
      sanitizeStringForJSON(general?.daoName),
      general?.daoSymbol.replace('$', ''),
      sanitizeStringForJSON(general?.daoDescription),
      general?.daoAvatar,
      sanitizeStringForJSON(general?.daoWebsite || ''),
      'https://api.zora.co/renderer/stack-images',
    ]
  )

  const tokenParams = {
    initStrings: hexlify(tokenParamsHex) as AddressType,
  }

  const auctionParams = {
    reservePrice: auctionSettings.auctionReservePrice
      ? parseEther(auctionSettings.auctionReservePrice.toString())
      : parseEther('0'),
    duration: auctionSettings?.auctionDuration
      ? BigInt(toSeconds(auctionSettings?.auctionDuration))
      : BigInt('86400'),
  }

  const govParams = {
    timelockDelay: BigInt(toSeconds({ days: 2 }).toString()),
    votingDelay: BigInt(toSeconds(auctionSettings.votingDelay)),
    votingPeriod: BigInt(toSeconds(auctionSettings.votingPeriod)),
    proposalThresholdBps: auctionSettings?.proposalThreshold
      ? BigInt(
          Number((Number(auctionSettings?.proposalThreshold) * 100).toFixed(2))
        )
      : BigInt('0'),
    quorumThresholdBps: auctionSettings?.quorumThreshold
      ? BigInt(
          Number((Number(auctionSettings?.quorumThreshold) * 100).toFixed(2))
        )
      : BigInt('0'),
    vetoer:
      vetoPower === true
        ? getAddress(vetoerAddress as AddressType)
        : getAddress(NULL_ADDRESS),
  }

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

    if (founderParams[0].wallet !== activeWallet?.address) {
      console.log('WHOS WHO::', founderParams[0].wallet, activeWallet?.address)
      setDeploymentError(DEPLOYMENT_ERROR.MISMATCHING_SIGNER)
      return
    }

    if (founderParams.length === 0) {
      setDeploymentError(DEPLOYMENT_ERROR.NO_FOUNDER)
      return
    }

    if (ipfsUpload.length === 0) {
      setDeploymentError(DEPLOYMENT_ERROR.MISSING_IPFS_ARTWORK)
      return
    }

    setIsPendingTransaction(true)
    let transaction
    try {
      const config = await prepareWriteContract({
        address: PUBLIC_MANAGER_ADDRESS[chain],
        chainId: chain,
        abi: managerAbi,
        functionName: 'deploy',
        args: [founderParams, tokenParams, auctionParams, govParams],
      })
      const tx = await writeContract(config)
      console.log('tx::::', tx)
      if (tx.hash) transaction = await waitForTransaction({ hash: tx.hash })
    } catch (e) {
      console.log('e', e)
      setIsPendingTransaction(false)
      return
    }

    const managerInterface = new Interface(managerAbi)

    //keccak256 hashed value of DAODeployed(address,address,address,address,address)
    const deployEvent = transaction?.logs.find(
      (log) =>
        log?.topics[0]?.toLowerCase() ===
        '0x456d2baf5a87d70e586ec06fb91c2d7849778dd41d80fa826a6ea5bf8d28e3a6'
    )

    console.log('deployEvent:::', deployEvent)

    let parsedEvent
    try {
      parsedEvent = managerInterface.parseLog({
        topics: deployEvent?.topics || [],
        data: deployEvent?.data || '',
      })
    } catch {}

    const deployedAddresses = parsedEvent?.args

    console.log('deployedAddresses:::', deployedAddresses)

    if (!deployedAddresses) {
      setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      setIsPendingTransaction(false)
      return
    }

    setDeployedDao({
      token: deployedAddresses[0],
      metadata: deployedAddresses[1],
      auction: deployedAddresses[2],
      treasury: deployedAddresses[3],
      governor: deployedAddresses[4],
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
    if (isPendingTransaction) toast.loading('Deploying DAO...')
    if (deploymentError) {
      toast.error(deploymentError)
      setIsLoading(false)
    }
  }, [isPendingTransaction, deploymentError])

  return (
    <FormProvider {...methods}>
      <div className="mt-4 text-left">
        <ConfirmTitle>CREATE A DAO</ConfirmTitle>
        <h2 className="mb-4 mt-2 text-2xl">Deploy</h2>
        <p className="mb-4 text-xs text-grey">
          Confirm your contract settings before deploying your DAO
        </p>
      </div>
      <form onSubmit={handleSubmit(handleDeploy)}>
        <DropDown text="General Info">
          <div className="px-4 py-6 ">
            <div>
              <ConfirmTitle>DAO AVATAR</ConfirmTitle>
              <div className="mt-2">
                <Image
                  src={general.daoAvatar}
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
        </DropDown>
        <DropDown text="Auction Settings">
          <div className="px-4 py-6 ">
            <ConfirmItem label="Auction Durantion">
              {`
                ${auctionSettings.auctionDuration.days} days,
                ${auctionSettings.auctionDuration.hours} hours &
                ${auctionSettings.auctionDuration.minutes} minutes.
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
        </DropDown>
        <DropDown text="Allocation">
          <div className="px-4 py-6 ">
            <ConfirmItem label="FOUNDER ALLOCATION">
              {`
                ${founderAllocation[0].founderAddress} will receive
                ${founderAllocation[0].allocationPercentage} % of Tokens, until
                ${founderAllocation[0].endDate}.
              `}
            </ConfirmItem>
          </div>
        </DropDown>
        <DropDown text="Set Up Artwork">
          <div className="px-4 py-6 ">
            <ConfirmItem label="Project Description">
              {general.daoDescription}
            </ConfirmItem>
            <div className="mt-2">
              <p className="text-xs uppercase text-grey">ARTWORK</p>
              <Button className="mx-auto w-full rounded-lg p-4 text-base ">
                Preview Artwork
              </Button>
            </div>
            <ConfirmItem label="Files Length">
              {setUpArtwork.filesLength}
            </ConfirmItem>
          </div>
        </DropDown>
        <div className="mt-6 rounded-xl border border-solid border-grey-light bg-background px-4 py-6">
          <ConfirmCheckbox>
            I have reviewed and acknowledge and agree to the{' '}
            <Link href="#" className="text-grey-dark">
              FAM Terms of Service
            </Link>
          </ConfirmCheckbox>

          <ConfirmCheckbox>
            I am deploying my DAO on{' '}
            <Link href="#" className="text-grey-dark">
              Goerli
            </Link>
          </ConfirmCheckbox>
        </div>
        <ContinueButton title="Confirm 1/2" loading={isLoading} />
      </form>
    </FormProvider>
  )
}
