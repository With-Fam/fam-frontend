import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/utils/viem'
import { Address } from 'viem'

const useExecuteProposal = (): any => {
  const { walletClient } = usePrivyWalletClient(CHAIN)

  const execute = async (proposal: any, community: Address) => {
    if (!walletClient) return
    const proposalId = proposal.proposalId
    const preciousTokens = [] as any[]
    const preciousTokenIds = [] as any[]
    const progressData = '0x'
    const extraData = '0x'
    const value = proposal.proposalData[0].value

    try {
      const hash = await walletClient.writeContract({
        account: walletClient.account?.address as Address,
        address: community,
        abi: partyAbi,
        functionName: 'execute',
        chain: CHAIN,
        args: [
          proposalId,
          {
            maxExecutableTime: proposal.maxExecutableTime,
            proposalData: proposal.rawProposalData,
            cancelDelay: 0,
          },
          preciousTokens,
          preciousTokenIds,
          progressData,
          extraData,
        ],
        value,
      })
      const publicClient = getPublicClient(CHAIN_ID)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      return receipt
    } catch (error) {
      return { error }
    }
  }

  return { execute }
}

export default useExecuteProposal
