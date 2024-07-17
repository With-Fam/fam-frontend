import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import getProposalInfo from '@/lib/party/getProposalInfo'
import { getPublicClient } from '@/lib/viem'
import { TransactionType } from '@/modules/create-activity/types'
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

    try {
      const publicClient = getPublicClient(CHAIN_ID)
      const proposalInfo = await getProposalInfo(proposal)
      const proposedByFam =
        proposalInfo?.type === TransactionType.ZORA_COLLECT ||
        proposalInfo?.type === TransactionType.ZORA_CREATE ||
        proposalInfo?.type === TransactionType.SEND_ETH

      const args = [
        proposalId,
        {
          maxExecutableTime: proposal.maxExecutableTime,
          proposalData: proposal.rawProposalData,
          cancelDelay: proposedByFam ? 0 : 300,
        },
        preciousTokens,
        preciousTokenIds,
        progressData,
        extraData,
      ] as any

      const gas = await publicClient.estimateContractGas({
        address: community as Address,
        abi: partyAbi,
        functionName: 'execute',
        account: walletClient.account?.address as Address,
        args,
      })

      await walletClient.switchChain({ id: CHAIN_ID })

      const hash = await walletClient.writeContract({
        account: walletClient.account?.address as Address,
        address: community,
        abi: partyAbi,
        functionName: 'execute',
        chain: CHAIN,
        args,
        gas,
      })
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      return receipt
    } catch (error) {
      return { error }
    }
  }

  return { execute }
}

export default useExecuteProposal
