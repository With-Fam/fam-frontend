import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/utils/viem'
import { Address } from 'viem'

const useVetoProposal = (): any => {
  const { walletClient } = usePrivyWalletClient(CHAIN)

  const veto = async (community: Address, proposalId: bigint) => {
    if (!walletClient) return
    try {
      const hash = await walletClient.writeContract({
        account: walletClient.account?.address as Address,
        address: community,
        abi: partyAbi,
        functionName: 'veto',
        chain: CHAIN,
        args: [proposalId],
      })
      const publicClient = getPublicClient(CHAIN_ID)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      return receipt
    } catch (error) {
      console.error(error)
      return { error }
    }
  }

  return { veto }
}

export default useVetoProposal
