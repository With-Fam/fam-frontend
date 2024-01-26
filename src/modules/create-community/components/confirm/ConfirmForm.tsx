// Framework
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
// import { Button } from '@/components/shared'
import ConfirmDropDown from './ConfirmDropDown'
import ConfirmItem from './ConfirmItem'
import ConfirmTitle from './ConfirmTitle'
import ConfirmCheckbox from './ConfirmCheckbox'
import ContinueButton from '@/modules/ContinueButton'
import { sanitizeStringForJSON } from '@/utils/sanitize'
import { toSeconds, walletSnippet } from '@/utils/helpers'

// Constants
import { PUBLIC_MANAGER_ADDRESS } from '@/constants/addresses'
import { NULL_ADDRESS } from '@/constants/addresses'
import { managerAbi } from '@/data/contract/abis'

import type { AddressType } from '@/types'
import { IPFSImage } from '@/components/ipfs/IPFSImage'
// import { RandomPreview } from '@/components/create-community/artwork/RandomPreview'

// Utils
import { getChainId } from '@/utils/getChainId'

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
  MISMATCHING_NETWORK:
    'Oops! Looks like there is a chain mismatch.',
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
  const chain = getChainId('')
  const { wallet: activeWallet } = usePrivyWagmi()

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
      sanitizeStringForJSON(`${general?.projectDescription}`),
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

      if ((e as any).name === 'ChainMismatchError') {
        setDeploymentError(DEPLOYMENT_ERROR.MISMATCHING_NETWORK)
      } else {
        setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      }
      setIsLoading(false)
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
        {/* <ConfirmDropDown text="Set Up Artwork">
          <div className="px-4 py-6">
            <ConfirmItem label="Project Description">
              {general.projectDescription}
            </ConfirmItem>
            <div className="mt-2">
              <p className="text-xs uppercase text-grey">ARTWORK</p> */}
        {/* <Button className="mx-auto w-full rounded-lg p-4 text-base ">
                Preview Artwork
              </Button> */}
        {/* <RandomPreview images={setUpArtwork.artwork} isEmpty={false} /> */}
        {/* </div>
            <ConfirmItem label="Files Length">
              {setUpArtwork.filesLength}
            </ConfirmItem>
          </div>
        </ConfirmDropDown> */}
        <div className="mt-10">
          <ConfirmCheckbox name="termsAcceptance">
            I have reviewed and acknowledge and agree to the{' '}
            <Link href="#" className="text-orange">
              FAM Terms of Service
            </Link>
          </ConfirmCheckbox>
          <ConfirmCheckbox name="deployDaoAcceptance">
            I am deploying my DAO on{' '}
            <Link href="#" className="text-orange">
              Goerli
            </Link>
          </ConfirmCheckbox>
        </div>
        <ContinueButton title="Confirm 1/2" loading={isLoading} />
      </form>
    </FormProvider>
  )
}
