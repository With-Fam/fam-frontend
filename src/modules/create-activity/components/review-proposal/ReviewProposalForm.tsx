'use client'

import { MutableRefObject } from 'react'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { FormProvider, useForm } from 'react-hook-form'
const DescriptionEditor = dynamic(() => import('./DescriptionEditor'), {
  ssr: false,
})
import schema, { ERROR_CODE, ReviewProposalFormValues } from './schema'
import type { AddressType, Maybe } from '@/types'
type ReviewProposalFormProps = {
  defaultValues: ReviewProposalFormValues
  formRef: MutableRefObject<Maybe<HTMLFormElement>>
  setLoading: (loading: boolean) => void
  setLoadingMessage: (message: string) => void
  community: AddressType
}
import TitleInput from '@/modules/create-activity/components/review-proposal/TitleInput'
import { AddButton } from './AddButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { partyAbi } from '@/data/contract/abis/Party'
import { getPublicClient } from '@/utils/viem'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { baseSepolia } from 'wagmi/chains'
import getViemNetwork from '@/utils/viem/getViemNetwork'
import getMaxExecutableTime from '@/utils/party/getMaxExecutableTime'
import { CHAIN_ID } from '@/constants/defaultChains'

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
  const { handleSubmit } = methods
  const chainId = baseSepolia.id
  const { walletClient } = usePrivyWalletClient(baseSepolia)
  const onSubmit = async () => {
    setLoading(true)
    try {
      if (!walletClient) return { error: 'Wallet client not found' }
      await walletClient.switchChain({ id: CHAIN_ID })
      const latestSnapIndex = 0n
      const maxExecutableTime = getMaxExecutableTime()
      const hardCodedTransferProposal =
        '0x00000004000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000cfbf34d385ea2d5eb947063b67ea226dcda3dc3800000000000000000000000000000000000000000000000000005af3107a400000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

      const proposal = {
        maxExecutableTime,
        cancelDelay: '0',
        proposalData: hardCodedTransferProposal,
      }
      const args = [proposal, latestSnapIndex] as any
      const contractConfig = {
        account: walletClient.account,
        abi: partyAbi,
        functionName: 'propose',
        address: community as AddressType,
        chain: getViemNetwork(chainId),
        args,
      }
      const publicClient = getPublicClient(chainId)
      const { request } = await publicClient.simulateContract(
        contractConfig as any
      )
      const txHash = await walletClient.writeContract(request as any)

      let transaction

      if (txHash) {
        transaction = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })
      }
      setLoadingMessage('Proposal posted. Redirecting...')
      return transaction
    } catch (err: any) {
      setLoading(false)
      console.error(err)

      if (err.name === 'ConnectorNotFoundError') {
        toast.error(ERROR_CODE.CONNECTOR_NOT_FOUND)
        return
      }

      if (err.shortMessage === 'User rejected the request.') {
        toast.error(ERROR_CODE.REJECTED)
        return
      }
      if (err.code === 'ACTION_REJECTED') {
        toast.error(ERROR_CODE.REJECTED)
        return
      }
      toast.error(err.messageD)
    }
  }

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
