'use client'

// Framework
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Third Parties
import toast from 'react-hot-toast'
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'
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
  community: AddressType
  setLoading: (loading: boolean) => void
  setLoadingMessage: (message: string) => void
}

// Components
import TitleInput from '@/modules/create-activity/components/review-proposal/TitleInput'
import { AddButton } from './AddButton'

// Helpers
import { yupResolver } from '@hookform/resolvers/yup'
import { baseSepolia } from 'wagmi/chains'
import { PARTY } from '@/constants/addresses'
import { partyAbi } from '@/data/contract/abis/Party'
import { prepareProposalTransactions } from '@/modules/create-activity/utils/prepareTransaction'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useProposalStore } from '@/modules/create-activity/stores'
import { useParams } from 'next/navigation'

/*--------------------------------------------------------------------*/

export function ReviewProposalForm({
  defaultValues,
  formRef,
  community,
  setLoading,
  setLoadingMessage,
}: ReviewProposalFormProps): JSX.Element {
  const methods = useForm<ReviewProposalFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const [creatingProposalError, setCreatingProposalError] = useState<
    string | undefined
  >()

  const { handleSubmit } = methods

  const chainId = baseSepolia.id

  const {
    wagmiData: { address },
  } = useCheckAuth()

  const onSubmit = useCallback(
    async (values: ReviewProposalFormValues) => {
      setLoading(true)

      try {
        const config = (await prepareWriteContract({
          address: community,
          chainId,
          abi: partyAbi,
          functionName: 'propose',
          args: [
            {
              maxExecutableTime: 86400,
              cancelDelay: 43200,
              proposalData: address!,
            },
            1715603725n,
          ],
        })) as any
        const response = await writeContract(config)

        console.log(response)
        await waitForTransaction({ hash: response.hash })
        setLoadingMessage('Proposal posted. Redirecting...')
      } catch (err: any) {
        console.log(err)

        setLoading(false)

        if (err.name === 'NOT_AUTHORIZED()') {
          setCreatingProposalError(ERROR_CODE.NOT_AUTHORIZED)
          return
        }

        if (err.name === 'ConnectorNotFoundError') {
          setCreatingProposalError(ERROR_CODE.CONNECTOR_NOT_FOUND)
          return
        }

        if (err.shortMessage === 'User rejected the request.') {
          setCreatingProposalError(ERROR_CODE.REJECTED)
          console.log('err::', err.shortMessage)
          return
        }
        if (err.code === 'ACTION_REJECTED') {
          console.log('err::', err.code)
          setCreatingProposalError(ERROR_CODE.REJECTED)
          return
        }
        setCreatingProposalError(ERROR_CODE.REJECTED)
        return
      }
    },
    [chainId]
  )

  useEffect(() => {
    if (creatingProposalError) {
      toast.dismiss()
      toast.error(creatingProposalError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingProposalError])

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
