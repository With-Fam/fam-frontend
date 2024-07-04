import { useCommunityProvider } from '@/contexts/CommunityProvider'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import useIsActiveVoting from '@/hooks/useIsActiveVoting'
import useIsHost from '@/hooks/useIsHost'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import { usePrivy } from '@privy-io/react-auth'
import { Address } from 'viem'

const useProposalState = (community: any, proposalDetail: any) => {
  const { ready, authenticated } = usePrivy()
  const { connectedWallet } = useConnectedWallet()
  const { isActiveVoting, isVoter } = useIsActiveVoting(proposalDetail)
  const { members } = useCommunityProvider() as any
  const isMember = members?.some(
    (user: any) =>
      user.userAddress.toLowerCase() === connectedWallet?.toLocaleLowerCase()
  )

  const { isHost } = useIsHost(community, connectedWallet as Address)
  const isAuthenticated = ready && authenticated && connectedWallet

  const canExecute =
    proposalDetail?.proposalState === PROPOSAL_STATUS.Ready &&
    isAuthenticated &&
    !isActiveVoting &&
    isMember

  const canVeto =
    proposalDetail?.proposalState !== PROPOSAL_STATUS.Complete &&
    proposalDetail?.proposalState !== PROPOSAL_STATUS.Defeated &&
    isAuthenticated &&
    isHost
  const canApprove = isAuthenticated && isActiveVoting && !isVoter

  return {
    canExecute,
    canVeto,
    canApprove,
    isAuthenticated,
  }
}

export default useProposalState
