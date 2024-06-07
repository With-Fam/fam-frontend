import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { ERROR_CODE } from '@/modules/create-activity/components/review-proposal/schema'
import { useProposalStore } from '@/modules/create-activity/stores'
import getProposalData from '@/utils/party/getProposalData'
import { getPublicClient } from '@/utils/viem'
import { usePrivy } from '@privy-io/react-auth'
import toast from 'react-hot-toast'
import { Address, parseEther } from 'viem'

const useCreateProposal: any = (community: Address) => {
  const { walletClient } = usePrivyWalletClient(CHAIN)
  const { transactions } = useProposalStore()
  const { logout } = usePrivy()
  const { target, value } = transactions[0].transactions[0]

  const create = async () => {
    try {
      if (!walletClient) {
        await logout()
        return false
      }
      await walletClient.switchChain({ id: CHAIN_ID })

      const latestSnapIndex = 0n
      const proposalRaw = {
        target,
        value: parseEther(value),
        data: '0x0',
        optional: false,
        expectedResultHash: '0x0',
      }
      const proposalData = getProposalData(proposalRaw)
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
