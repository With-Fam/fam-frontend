import { useCommunityProvider } from '@/contexts/CommunityProvider'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import useVotingStatus from '@/hooks/useVotingStatus'
import useIsHost from '@/hooks/useIsHost'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import { usePrivy } from '@privy-io/react-auth'
import { Address } from 'viem'

const useProposalState = (community: any, proposalDetail: any) => {
  const { ready, authenticated } = usePrivy()
  const { connectedWallet } = useConnectedWallet()
  const { isActiveVoting } = useVotingStatus(proposalDetail)
  const { members } = useCommunityProvider() as any
  const isMember = members?.some(
    (user: any) =>
      user.userAddress.toLowerCase() === connectedWallet?.toLocaleLowerCase()
  )
  const currentTime = Date.now()
  const { isHost } = useIsHost(community, connectedWallet as Address)
  const isAuthenticated = ready && authenticated && connectedWallet
  const vetoFinishedTime =
    (proposalDetail?.proposedTime + proposalDetail?.vetoDurationSeconds) * 1000

  const canExecute =
    proposalDetail?.proposalState === PROPOSAL_STATUS.Ready &&
    (proposalDetail?.numHostsAccepted === proposalDetail?.numHosts ||
      vetoFinishedTime < currentTime)
  isAuthenticated && !isActiveVoting && (isMember || isHost)

  const canVeto =
    proposalDetail?.proposalState !== PROPOSAL_STATUS.Complete &&
    proposalDetail?.proposalState !== PROPOSAL_STATUS.Defeated &&
    isAuthenticated &&
    isHost
  const canApprove = isAuthenticated && isActiveVoting && (isMember || isHost)

  return {
    canExecute,
    canVeto,
    canApprove,
    isAuthenticated,
  }
}

export default useProposalState
