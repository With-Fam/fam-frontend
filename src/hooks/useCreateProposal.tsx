import { SALE_STRATEGY } from '@/constants/addresses'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { ERROR_CODE } from '@/modules/create-activity/components/review-proposal/schema'
import { useProposalStore } from '@/modules/create-activity/stores'
import { TransactionType } from '@/modules/create-activity/types'
import getZoraCreateProposalData from '@/utils/party/getZoraCreateProposalData'
import getSendEthProposalData from '@/utils/party/getSendEthProposalData'
import getZoraCollectProposalData from '@/utils/party/getZoraCollectProposalData'
import { getPublicClient } from '@/utils/viem'
import { usePrivy } from '@privy-io/react-auth'
import toast from 'react-hot-toast'
import { Address } from 'viem'

const useCreateProposal: any = (community: Address) => {
  const { walletClient } = usePrivyWalletClient(CHAIN)
  const { transactions, showAdvancedOfZoraCollect } = useProposalStore()
  const { logout } = usePrivy()
  const { target, value, ethPrice, tokenId } = transactions[0].transactions[0]
  const { type } = transactions[0]

  const create = async () => {
    try {
      if (!walletClient) {
        await logout()
        return false
      }
      await walletClient.switchChain({ id: CHAIN_ID })

      const latestSnapIndex = 0n
      let proposalData: any = null
      if (type === TransactionType.SEND_ETH)
        proposalData = getSendEthProposalData(target, value)

      if (type === TransactionType.ZOAR_COLLECT)
        proposalData = getZoraCollectProposalData(
          value as Address,
          SALE_STRATEGY[CHAIN.id],
          target,
          showAdvancedOfZoraCollect ? ethPrice : 0,
          showAdvancedOfZoraCollect ? tokenId : 1n
        )

      if (type === TransactionType.ZORA_CREATE)
        proposalData = getZoraCreateProposalData(target)

      const args = [proposalData, latestSnapIndex] as any
      const contractConfig = {
        account: walletClient.account,
        abi: partyAbi,
        functionName: 'propose',
        address: community,
        chain: CHAIN,
        args,
      }
      const publicClient = getPublicClient(CHAIN_ID)
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
      return transaction
    } catch (err: any) {
      console.error(err)

      if (err.name === 'ConnectorNotFoundError') {
        toast.error(ERROR_CODE.CONNECTOR_NOT_FOUND)
        return false
      }

      if (err.shortMessage === 'User rejected the request.') {
        toast.error(ERROR_CODE.REJECTED)
        return false
      }
      if (err.code === 'ACTION_REJECTED') {
        toast.error(ERROR_CODE.REJECTED)
        return false
      }
      toast.error(err.messageD)
      return false
    }
  }

  return { create }
}

export default useCreateProposal
