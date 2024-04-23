'use client'

// Framework
import { MutableRefObject, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Third Parties
import toast from 'react-hot-toast'
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'
import { useContractRead } from 'wagmi'
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
import { prepareProposalTransactions } from '@/modules/create-activity/utils/prepareTransaction'
import { useCheckAuth } from '@/hooks/useCheckAuth'

/*--------------------------------------------------------------------*/

export function ReviewProposalForm({
  defaultValues,
  formRef,
  setLoading,
  setLoadingMessage,
}: ReviewProposalFormProps): JSX.Element {
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
      if (proposalThreshold === undefined) {
        return
      }

      const votesToNumber = votes ? Number(votes) : 0
      const doesNotHaveEnoughVotes = votesToNumber <= Number(proposalThreshold)

      if (doesNotHaveEnoughVotes) {
        toast.error(ERROR_CODE.NOT_ENOUGH_VOTES)
        return
      }

      setLoading(true)

      const {
        targets,
        values: transactionValues,
        calldata,
      } = prepareProposalTransactions(transactions)

      try {
        const params = {
          targets: targets,
          values: transactionValues,
          calldatas: calldata as Array<AddressType>,
          description: values.title + '&&' + values.summary,
        }

        const config = await prepareWriteContract({
          abi: governorAbi,
          functionName: 'propose',
          address: addresses?.governor as AddressType,
          chainId: chain.id,
          args: [
            params.targets,
            params.values,
            params.calldatas,
            params.description,
          ],
        })

        const response = await writeContract(config)
        await waitForTransaction({ hash: response.hash })
        setLoadingMessage('Proposal posted. Redirecting...')
      } catch (err: any) {
        setLoading(false)

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
