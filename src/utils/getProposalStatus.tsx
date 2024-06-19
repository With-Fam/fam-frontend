import { PROPOSAL_STATUS } from '@/hooks/useProposalData'

const getProposalStatus = (proposal: any) => {
  if (proposal.proposalState == PROPOSAL_STATUS.Complete)
    return PROPOSAL_STATUS.Complete
  if (proposal.proposalState == PROPOSAL_STATUS.Passed)
    return PROPOSAL_STATUS.Passed
  if (proposal.proposalState === PROPOSAL_STATUS.Ready)
    return PROPOSAL_STATUS.Ready
  if (proposal.proposalState === PROPOSAL_STATUS.Defeated)
    return PROPOSAL_STATUS.Defeated
  return 0
}

export default getProposalStatus
