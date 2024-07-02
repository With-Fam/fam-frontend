import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import handleTxError from '@/lib/handleTxError'
import { getPublicClient } from '@/lib/viem'
import { Address } from 'viem'

const useVetoProposal = (): any => {
  const { walletClient } = usePrivyWalletClient(CHAIN)

  const veto = async (community: Address, proposalId: bigint) => {
    if (!walletClient) return
    try {
      await walletClient.switchChain({ id: CHAIN_ID })

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
      handleTxError(error)
      return { error }
    }
  }

  return { veto }
}

export default useVetoProposal
