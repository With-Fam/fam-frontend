'use client'

// Framework
import { Address, useAccount, useContractReads } from 'wagmi'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { encodeFunctionData, formatEther } from 'viem'
import { yupResolver } from '@hookform/resolvers/yup'
import _isEqual from 'lodash.isequal'

// Schema
import {
  updateCommunitySchema,
  UpdateCommunityFormValues,
} from './UpdateCommunity.schema'

// Components
import { UploadIPFSImage } from '@/components/ipfs/UploadIPFSImage'
import { TextArea, TextInput } from '@/components/forms'
import {
  BuilderTransaction,
  useProposalStore,
} from '@/modules/create-activity/stores'
import ContinueButton from '@/modules/ContinueButton'
import { formValuesToTransactionMap } from '@/modules/create-activity/utils'
import { FounderFieldArray } from '@/modules/create-community/components/auctions/FounderFieldArray'
import { Paragraph } from '@/stories'
import { Alert, Sliders } from '@/components/icons'

// Contract
import { getEnsAddress } from '@/utils/ens'
import { TokenAllocation } from '@/modules/create-community/components/auctions/AuctionForm.schema'
import { AddressType, FounderParameters } from '@/types'
import { useChainStore } from '@/utils/stores/useChainStore'
import { TransactionType } from '@/modules/create-activity/types'
import {
  auctionAbi,
  governorAbi,
  metadataAbi,
  tokenAbi,
} from '@/data/contract/abis'
import { useDaoStore } from '@/modules/dao'
import { fromSeconds, unpackOptionalArray } from '@/utils/helpers'
import { NULL_ADDRESS } from '@/constants/addresses'
import VetoManagement from '@/modules/create-community/components/auctions/VetoManagement'

interface UpdateCommunityFormProps {
  callback: () => void
  collectionAddress: string
}

export function UpdateCommunityForm({
  callback, // collectionAddress,
}: UpdateCommunityFormProps): JSX.Element {
  const { address } = useAccount()

  // Access local stores
  const chain = useChainStore((x) => x.chain)
  const createProposal = useProposalStore((state) => state.createProposal)
  const addresses = useDaoStore((state) => state.addresses)

  // const router = useRouter()

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction as Address,
  }

  const governorContractParams = {
    abi: governorAbi,
    address: addresses?.governor as Address,
  }

  const metadataContractParams = {
    abi: metadataAbi,
    address: addresses?.metadata as Address,
  }

  const tokenContractParams = {
    abi: tokenAbi,
    address: addresses?.token as Address,
  }

  const { data } = useContractReads({
    allowFailure: false,
    contracts: [
      {
        ...auctionContractParams,
        chainId: chain.id,
        functionName: 'duration',
      },
      {
        ...auctionContractParams,
        chainId: chain.id,
        functionName: 'reservePrice',
      },
      {
        ...governorContractParams,
        chainId: chain.id,
        functionName: 'vetoer',
      },
      {
        ...governorContractParams,
        chainId: chain.id,
        functionName: 'votingPeriod',
      },
      {
        ...governorContractParams,
        chainId: chain.id,
        functionName: 'votingDelay',
      },
      {
        ...governorContractParams,
        chainId: chain.id,
        functionName: 'quorumThresholdBps',
      },
      {
        ...governorContractParams,
        chainId: chain.id,
        functionName: 'proposalThresholdBps',
      },
      {
        ...metadataContractParams,
        chainId: chain.id,
        functionName: 'contractImage',
      },
      {
        ...metadataContractParams,
        chainId: chain.id,
        functionName: 'projectURI',
      },
      // Comment this and rendererBase in the array below
      // {
      //   ...metadataContractParams,
      //   chainId: chain.id,
      //   functionName: 'rendererBase',
      // },
      {
        ...metadataContractParams,
        chainId: chain.id,
        functionName: 'description',
      },
      {
        ...tokenContractParams,
        chainId: chain.id,
        functionName: 'getFounders',
      },
    ] as const,
  })

  const [
    auctionDuration,
    auctionReservePrice,
    vetoer,
    votingPeriod,
    votingDelay,
    quorumVotesBps,
    proposalThresholdBps,
    daoImage,
    daoWebsite,
    // rendererBase,
    description,
    founders,
  ] = unpackOptionalArray(data, 12)

  const initialValues: UpdateCommunityFormValues = {
    /* artwork */
    projectDescription:
      description?.replace(/\\n/g, String.fromCharCode(13, 10)) || '',
    // artwork: []

    /* metadata */
    daoAvatar: daoImage || '',
    // rendererBase: rendererBase || '',
    daoWebsite: daoWebsite || '',

    /* governor */
    proposalThreshold: Number(proposalThresholdBps) / 100 || 0,
    quorumThreshold: Number(quorumVotesBps) / 100 || 0,
    votingPeriod: fromSeconds(votingPeriod && BigInt(votingPeriod)),
    votingDelay: fromSeconds(votingDelay && BigInt(votingDelay)),
    founderAllocation:
      (founders as unknown as FounderParameters[])?.map((x: any) => ({
        founderAddress: x.wallet,
        allocationPercentage: x.ownershipPct,
        endDate: new Date(x.vestExpiry * 1000).toISOString().substring(0, 10),
      })) || [],
    vetoPower: !!vetoer && vetoer !== NULL_ADDRESS,
    vetoerAddress: vetoer || '',

    /* auction */
    auctionDuration: fromSeconds(auctionDuration && Number(auctionDuration)),
    auctionReservePrice: auctionReservePrice
      ? parseFloat(formatEther(auctionReservePrice))
      : 0,
  }

  const methods = useForm<UpdateCommunityFormValues>({
    resolver: yupResolver(updateCommunitySchema(address)) as any,
    defaultValues: initialValues,
  })

  const withPauseUnpause = (
    transactions: BuilderTransaction[],
    auctionAddress: Address
  ) => {
    const targetAddresses = transactions
      .flatMap((txn) => txn.transactions)
      .map((txn) => txn.target)

    if (!targetAddresses.includes(auctionAddress)) {
      return transactions
    }

    const pause = {
      type: TransactionType.CUSTOM,
      transactions: [
        {
          functionSignature: 'pause()',
          target: auctionAddress,
          calldata: encodeFunctionData({
            abi: auctionAbi,
            functionName: 'pause',
          }),
          value: '',
        },
      ],
    }

    const unpause = {
      type: TransactionType.CUSTOM,
      transactions: [
        {
          functionSignature: 'unpause()',
          target: auctionAddress,
          calldata: encodeFunctionData({
            abi: auctionAbi,
            functionName: 'unpause',
          }),
          value: '',
        },
      ],
    }

    return [pause, ...transactions, unpause]
  }

  const onSubmit = async (values: UpdateCommunityFormValues) => {
    let transactions: BuilderTransaction[] = []

    let field: keyof UpdateCommunityFormValues

    for (field in values) {
      let value = values[field]

      if (_isEqual(value, initialValues[field])) {
        continue
      }

      if (field === 'vetoerAddress') {
        value = await getEnsAddress(value as string)
      }

      if (field === 'founderAllocation') {
        value = (value as TokenAllocation[]).map(
          ({ founderAddress, allocationPercentage, endDate }) => ({
            founderAddress: founderAddress as AddressType,
            allocationPercentage: allocationPercentage
              ? allocationPercentage
              : 0,
            endDate: Math.floor(new Date(endDate).getTime() / 1000),
          })
        )
      }

      const transactionProperties: any = formValuesToTransactionMap[field]
      if (!transactionProperties) {
        console.log('error with transaction format::', transactionProperties)
        return
      }
      const calldata = transactionProperties.constructCalldata(value)
      const target = transactionProperties.getTarget(addresses)

      if (target)
        transactions.push({
          type: TransactionType.CUSTOM,
          transactions: [
            {
              functionSignature: transactionProperties.functionSignature,
              target,
              calldata: calldata || '',
              value: '',
            },
          ],
        })

      // removes burnVetoer from the list of transactions if updateVetoer is present
      if (field === 'vetoerAddress') {
        transactions = transactions.filter(
          (tx: BuilderTransaction) =>
            tx.transactions[0].functionSignature !== 'burnVetoer'
        )
      }
      if (field === 'vetoPower') {
        transactions = transactions.filter(
          (tx: BuilderTransaction) =>
            tx.transactions[0].functionSignature !== 'updateVetoer'
        )
      }
    }

    const transactionsWithPauseUnpause = withPauseUnpause(
      transactions,
      addresses?.auction as Address
    )

    createProposal({
      disabled: false,
      title: undefined,
      summary: undefined,
      transactions: transactionsWithPauseUnpause,
    })
    callback()
  }

  const { control, handleSubmit } = methods

  console.log(methods.formState)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[668px]"
      >
        <Controller
          name="daoAvatar"
          control={control}
          render={({ field }) => (
            <UploadIPFSImage
              name={field.name}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <div className="mt-6 flex flex-col gap-4">
          <TextArea
            name="projectDescription"
            label="Description"
            placeholder="Tell the world about your project"
          />
          {/** Thoughts on having a smart input like Nouns? */}
          <TextInput
            name="daoWebsite"
            label="Website"
            placeholder="https://www.withfam.xyz"
          />
        </div>
        <div className="relative z-0 mt-6">
          <TextInput
            name="auctionReservePrice"
            type="number"
            step="0.01"
            label="Reserve price"
            placeholder="0.05 ETH"
          />
          <div className="absolute right-4 top-4 z-10 cursor-pointer">
            <Sliders />
          </div>
        </div>
        <div className="mb-6 mt-3 flex items-center gap-2 rounded-2xl border border-solid border-grey-light bg-transparent p-4">
          <Alert />
          <Paragraph as="p5" className="text-left text-xs text-grey">
            Auction proceeds go into a shared pool managed by the community.
            Includes a 2% platform fee
          </Paragraph>
        </div>
        <Paragraph as="p4" className="text-left text-grey-dark">
          The founders can choose to receive a % of membership tokens until the
          specified end date. This ensures founders can have a greater influence
          when voting on community activities
        </Paragraph>
        <FounderFieldArray />
        <VetoManagement />
        <ContinueButton />
        <span className="hidden h-6 md:block" />
      </form>
    </FormProvider>
  )
}
