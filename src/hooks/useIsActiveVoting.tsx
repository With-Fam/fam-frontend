import useConnectedWallet from '@/hooks/useConnectedWallet'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'

const useIsActiveVoting = (proposal: any) => {
  const proposalState = proposal?.proposalState
  const { connectedWallet } = useConnectedWallet()
  const isVoter = proposal?.votes.some(
    (vote: any) => vote.address.toLowerCase() === connectedWallet?.toLowerCase()
  )

  const isActiveVoting =
    (proposalState === PROPOSAL_STATUS.Passed ||
      proposalState === PROPOSAL_STATUS.Voting) &&
    !isVoter

  return {
    isActiveVoting,
  }
}

export default useIsActiveVoting
