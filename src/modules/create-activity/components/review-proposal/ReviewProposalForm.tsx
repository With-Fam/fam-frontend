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
import type { Maybe } from '@/types'
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
import { yupResolver } from '@hookform/resolvers/yup'
import { baseSepolia } from 'wagmi/chains'
import { PARTY_FACTORY, PARTY_IMPLEMENTATION } from '@/constants/addresses'
import { partyFactoryAbi } from '@/data/contract/abis/PartyFactory'

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

  const [creatingProposalError, setCreatingProposalError] = useState<
    string | undefined
  >()

  const { handleSubmit } = methods

  const chainId = baseSepolia.id

  const onSubmit = useCallback(
    async (values: ReviewProposalFormValues) => {
      setLoading(true)

      try {
        const config = await prepareWriteContract({
          address: PARTY_FACTORY[chainId],
          chainId: chainId,
          abi: partyFactoryAbi,
          functionName: 'createParty',
          args: [
            PARTY_IMPLEMENTATION[chainId],
            ['0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38'],
            {
              governance: {
                hosts: ['0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38'],
                voteDuration: 172800,
                executionDelay: 86400,
                passThresholdBps: 5000,
                totalVotingPower: 100000000000000000000n,
                feeBps: 1000,
                feeRecipient: '0x0000000000000000000000000000000000000000',
              },
              proposalEngine: {
                enableAddAuthorityProposal: true,
                allowArbCallsToSpendPartyEth: true,
                allowOperators: true,
                distributionsConfig: 1,
              },
              name: values.title,
              symbol: 'FAM',
              customizationPresetId: 0n,
            },
            [],
            [],
            1715603725,
          ],
        })

        const response = await writeContract(config)
        await waitForTransaction({ hash: response.hash })
        setLoadingMessage('Proposal posted. Redirecting...')
      } catch (err: any) {
        setLoading(false)

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
