import useConnectedWallet from '@/hooks/useConnectedWallet'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import { BigNumber } from '@ethersproject/bignumber'

const useVotingStatus = (proposal: any) => {
  const proposalState = proposal?.proposalState
  const { connectedWallet } = useConnectedWallet()
  const isVoter = proposal?.votes.some(
    (vote: any) => vote.address.toLowerCase() === connectedWallet?.toLowerCase()
  )

  const votersNum = proposal?.votes?.length || 1
  const totalVotingPower = BigNumber.from(
    proposal?.totalVotingPower || 1n
  ).toBigInt()
  const isActiveVoting =
    proposalState === PROPOSAL_STATUS.Passed ||
    proposalState === PROPOSAL_STATUS.Voting

  const currentVotedPower = BigNumber.from(proposal?.numVotes || '0').toBigInt()
  const currentVotePercent = (currentVotedPower * 100n) / totalVotingPower
  const displayedPercent = Number(currentVotePercent) / 100
  const unitVotingPower =
    currentVotedPower / BigNumber.from(votersNum).toBigInt()

  const remainedVotingPower = totalVotingPower - currentVotedPower
  const needToPassNum = Number(remainedVotingPower / (unitVotingPower || 1n))

  return {
    isActiveVoting,
    isVoter,
    displayedPercent,
    needToPassNum,
  }
}

export default useVotingStatus
