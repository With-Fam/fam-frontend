import {
  PARTY_PROPOSAL_ADD_MEMBER_CANCELDELAY,
  PARTY_PROPOSAL_CANCELDELAY,
} from '@/constants/consts'
import { CHAIN, CHAIN_ID, PUBLIC_IS_TESTNET } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import getProposalType from '@/lib/party/getProposalType'
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
      const proposalType = getProposalType(proposal)
      const proposedByFam =
        proposalType === TransactionType.ZORA_COLLECT ||
        proposalType === TransactionType.ZORA_CREATE ||
        proposalType === TransactionType.SEND_ETH

      const isAddMemberProposal = proposalType === TransactionType.ADD_MEMBER
      const partyCancelDelayValue =
        isAddMemberProposal && !PUBLIC_IS_TESTNET
          ? PARTY_PROPOSAL_ADD_MEMBER_CANCELDELAY
          : PARTY_PROPOSAL_CANCELDELAY

      const args = [
        proposalId,
        {
          maxExecutableTime: proposal.maxExecutableTime,
          proposalData: proposal.rawProposalData,
          cancelDelay: proposedByFam ? 0 : partyCancelDelayValue,
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
