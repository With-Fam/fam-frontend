'use client'

// Framework
import { MutableRefObject, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Third Parties
import toast from 'react-hot-toast'
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
import { yupResolver } from '@hookform/resolvers/yup'
import { useDaoStore } from '@/modules/dao'
import { useChainStore } from '@/utils/stores/useChainStore'
import { partyAbi } from '@/data/contract/abis/Party'
import { getPublicClient } from '@/utils/viem'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { baseSepolia } from 'wagmi/chains'
import getViemNetwork from '@/utils/viem/getViemNetwork'
import getMaxExecutableTime from '@/utils/party/getMaxExecutableTime'
import getProposalData from '@/utils/party/getProposalData'
import { BytecodeProposalData } from '@/types/partyTypes'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'

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
  const chainId = CHAIN_ID
  const { walletClient } = usePrivyWalletClient(CHAIN)
  const walletChainId = walletClient?.chain?.id
  console.log('SWEETS walletChainId', walletChainId)
  const isCorrectChain = walletClient?.chain?.id === CHAIN_ID
  console.log('SWEETS isCorrectChain', isCorrectChain)

  const onSubmit = async () => {
    setLoading(true)

    try {
      if (!walletClient) return { error: 'Wallet client not found' }
      await walletClient.switchChain({ id: CHAIN_ID })
      const latestSnapIndex = 0n
      const dataResponse = getProposalData([
        {
          target: walletClient.account?.address,
          value: '1',
          data: '0x0000000000000000000000000000000000000000000000000000000000000000', // bytecode
          optional: false, // If true, the call is allowed to fail.
          expectedResultHash:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
        },
      ] as BytecodeProposalData[])
      console.log('SWEETS GET DYNAMIC DATA', dataResponse.proposalData)
      // const hardCodedTransferProposal =
      //   '0x00000004000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000cfbf34d385ea2d5eb947063b67ea226dcda3dc3800000000000000000000000000000000000000000000000000005af3107a400000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
      // console.log('SWEETS GET DYNAMIC DATA', hardCodedTransferProposal)

      // const proposal = {
      //   maxExecutableTime,
      //   cancelDelay: '0',
      //   proposalData: hardCodedTransferProposal,
      // }
      const args = [dataResponse, latestSnapIndex] as any
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
