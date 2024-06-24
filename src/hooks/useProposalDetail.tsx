import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import getProposalVoteEvent from '@/lib/party/getProposalVoteEvents'
import getProposedEvent from '@/lib/party/getProposedEvent'
import { getPublicClient } from '@/lib/viem'
import { useCallback, useEffect, useState } from 'react'
import { Address } from 'viem'

const useProposalDetail = (
  community: any,
  proposalId: any,
  proposalBlocknumber: any
) => {
  const [proposalDetail, setProposalDetail] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const getProposalDetail = useCallback(async () => {
    if (!proposalId || !community || !proposalBlocknumber) return
    setLoading(true)
    const publicClient = getPublicClient(CHAIN_ID)
    const response = await publicClient.readContract({
      address: community as Address,
      abi: partyAbi,
      functionName: 'getProposalStateInfo',
      args: [proposalId],
    })

    const proposalStateValues = response[1]
    const detail = {
      completedTime: proposalStateValues.completedTime,
      executeTime: proposalStateValues.executedTime,
      vetoDurationSeconds: proposalStateValues.executionDelay,
      totalVotingPower: proposalStateValues.totalVotingPower,
      voteDuration: proposalStateValues.voteDuration,
      passedTime: proposalStateValues.passedTime,
      proposedTime: proposalStateValues.proposedTime,
      numHosts: proposalStateValues.numHosts,
      numHostsAccepted: proposalStateValues.numHostsAccepted,
      proposalId,
      name: `Proposal ${proposalId}`,
      proposalState: response[0],
      numVotes: proposalStateValues.votes.toString(),
      createdTimestamp: proposalStateValues.proposedTime,
    }
    const eventData = await getProposedEvent(community, proposalBlocknumber)
    const votes = await getProposalVoteEvent(
      community,
      proposalId,
      proposalBlocknumber
    )
    setProposalDetail({
      ...detail,
      ...eventData,
      votes,
    })
    setLoading(false)
  }, [proposalId, community, proposalBlocknumber])

  useEffect(() => {
    getProposalDetail()
  }, [getProposalDetail])

  return {
    proposalDetail,
    getProposalDetail,
    loading,
  }
}

export default useProposalDetail
