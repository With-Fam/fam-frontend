import { ProposalState } from '@/data/contract/requests/getProposalState'

export const isProposalOpen = (state: ProposalState): boolean => {
  if (
    state === ProposalState.Queued ||
    state === ProposalState.Succeeded ||
    state === ProposalState.Active ||
    state === ProposalState.Pending
  ) {
    return true
  }
  return false
}
