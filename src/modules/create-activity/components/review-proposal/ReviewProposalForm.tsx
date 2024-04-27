'use client'

// Framework
import { MutableRefObject, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Interface, parseEther } from 'ethers'

// Third Parties
import toast from 'react-hot-toast'
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'
import { useAccount, useContractRead } from 'wagmi'
import { FormProvider, useForm } from 'react-hook-form'
const DescriptionEditor = dynamic(() => import('./DescriptionEditor'), {
  ssr: false,
}) // Quill library requires a dynamic import to not break SSR

// Schema and types
import schema, { ERROR_CODE, ReviewProposalFormValues } from './schema'
import type { AddressType, Maybe } from '@/types'
type ReviewProposalFormProps = {
  defaultValues: ReviewProposalFormValues
  formRef: MutableRefObject<Maybe<HTMLFormElement>>
  setLoading: (loading: boolean) => void
  setLoadingMessage: (message: string) => void
  community: AddressType
}

// Components
import TitleInput from '@/modules/create-activity/components/review-proposal/TitleInput'
import { AddButton } from './AddButton'

// Helpers
import { governorAbi, tokenAbi } from '@/data/contract/abis'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDaoStore } from '@/modules/dao'
import { useChainStore } from '@/utils/stores/useChainStore'
import { useProposalStore } from '@/modules/create-activity/stores'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { partyAbi } from '@/data/contract/abis/Party'

/*--------------------------------------------------------------------*/

export function ReviewProposalForm({
  defaultValues,
  formRef,
  community,
  setLoading,
  setLoadingMessage,
}: ReviewProposalFormProps): JSX.Element {
  const { address: connectedWallet } = useAccount()
  const methods = useForm<ReviewProposalFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  })
  const { handleSubmit } = methods
  const addresses = useDaoStore((state) => state.addresses)
  const chain = useChainStore((x) => x.chain)
  const {
    wagmiData: { address },
  } = useCheckAuth()
  const { transactions } = useProposalStore()

  const { data: votes } = useContractRead({
    address: addresses?.token as AddressType,
    abi: tokenAbi,
    enabled: !!address,
    functionName: 'getVotes',
    chainId: chain.id,
    args: [address as AddressType],
  })

  const { data: proposalThreshold } = useContractRead({
    address: addresses?.governor as AddressType,
    chainId: chain.id,
    abi: governorAbi,
    functionName: 'proposalThreshold',
  })

  const onSubmit = useCallback(
    async (values: ReviewProposalFormValues) => {
      setLoading(true)
      try {
        console.log('SWEETS onSubmit')

        const latestSnapIndex = 9236006n
        console.log('SWEETS latestSnapIndex', latestSnapIndex)

        const ABI = ['function transfer(address to, uint amount)']
        console.log('SWEETS ABI', ABI)

        const iface = new Interface(ABI)
        console.log('SWEETS iface', iface)

        const encoded = iface.encodeFunctionData('transfer', [
          connectedWallet,
          parseEther('0.001'),
        ])
        console.log('SWEETS encoded', encoded)
        const currentDate = new Date()
        const oneMonthLater = new Date(
          currentDate.setMonth(currentDate.getMonth() + 1)
        )
        const maxExecutableTime = Math.floor(oneMonthLater.getTime() / 1000)
        console.log('SWEETS maxExecutableTime:', maxExecutableTime)

        const proposal = {
          maxExecutableTime,
          cancelDelay: '0',
          proposalData:
            '0x00000004000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000cfbf34d385ea2d5eb947063b67ea226dcda3dc3800000000000000000000000000000000000000000000000000005af3107a400000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        }
        const args = [proposal, latestSnapIndex] as any
        const config = await prepareWriteContract({
          abi: partyAbi,
          functionName: 'propose',
          address: community as AddressType,
          chainId: chain.id,
          args,
        })

        const response = await writeContract(config)
        await waitForTransaction({ hash: response.hash })
        setLoadingMessage('Proposal posted. Redirecting...')
      } catch (err: any) {
        setLoading(false)
        console.error(err)

        if (err.name === 'ConnectorNotFoundError') {
          toast.error(ERROR_CODE.CONNECTOR_NOT_FOUND)
          return
        }

        if (err.shortMessage === 'User rejected the request.') {
          toast.error(ERROR_CODE.REJECTED)
          console.log('err::', err.shortMessage)
          return
        }
        if (err.code === 'ACTION_REJECTED') {
          console.log('err::', err.code)
          toast.error(ERROR_CODE.REJECTED)
          return
        }
        toast.error(err.messageD)
      }
    },
    [addresses, proposalThreshold, votes, chain.id, transactions]
  )

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-2xl grow flex-col"
      >
        <div className="flex grow flex-col">
          <div className="order-1 sm:order-2">
            <TitleInput
              name="title"
              placeholder="Title"
              className="block w-full text-lg outline-0"
            />
          </div>
          <DescriptionEditor name="summary" placeholder="Description" />
        </div>
        <AddButton />
      </form>
    </FormProvider>
  )
}
