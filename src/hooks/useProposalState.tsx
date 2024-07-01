import useConnectedWallet from '@/hooks/useConnectedWallet'
import useIsHost from '@/hooks/useIsHost'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import { usePrivy } from '@privy-io/react-auth'
import { Address } from 'viem'

const useProposalState = (
  community: any,
  proposalDetail: any,
  isActiveVoting: any
) => {
  const { ready, authenticated } = usePrivy()
  const { connectedWallet } = useConnectedWallet()

  const { isHost } = useIsHost(community, connectedWallet as Address)
  const isAuthenticated = ready && authenticated && connectedWallet

  const canExecute =
    proposalDetail?.proposalState === PROPOSAL_STATUS.Ready &&
    isAuthenticated &&
    !isActiveVoting
  const canVeto =
    proposalDetail?.proposalState !== PROPOSAL_STATUS.Complete &&
    proposalDetail?.proposalState !== PROPOSAL_STATUS.Defeated &&
    isAuthenticated &&
    isHost
  const canApprove =
    proposalDetail?.proposalState === PROPOSAL_STATUS.Passed &&
    isAuthenticated &&
    isActiveVoting

  return {
    canExecute,
    canVeto,
    canApprove,
    isAuthenticated,
  }
}

export default useProposalState
