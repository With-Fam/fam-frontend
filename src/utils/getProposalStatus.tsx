import { PROPOSAL_STATUS } from '@/hooks/useProposalData'

const getProposalStatus = (proposal: any) => {
  if (proposal.proposalState == PROPOSAL_STATUS.Complete)
    return PROPOSAL_STATUS.Complete
  if (proposal.proposalState == PROPOSAL_STATUS.Passed)
    return PROPOSAL_STATUS.Passed

  return 0
}

export default getProposalStatus
