import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/lib/viem'
import { Address } from 'viem'

const useVoteProposal = (): any => {
  const { walletClient } = usePrivyWalletClient(CHAIN)

  const vote = async (proposal: any, community: Address) => {
    if (!walletClient) return
    const proposalId = proposal.proposalId
    const latestSnapIndex = 0n

    try {
      const hash = await walletClient.writeContract({
        account: walletClient.account?.address as Address,
        address: community,
        abi: partyAbi,
        functionName: 'accept',
        chain: CHAIN,
        args: [proposalId, latestSnapIndex],
      })
      const publicClient = getPublicClient(CHAIN_ID)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      return receipt
    } catch (error) {
      return { error }
    }
  }

  return { vote }
}

export default useVoteProposal
