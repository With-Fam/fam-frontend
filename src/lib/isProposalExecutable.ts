import { ProposalState } from '@/data/contract/requests/getProposalState'
import { Proposal } from '@/data/subgraph/requests/proposalQuery'
import { parseBlockchainDate } from '@/lib/parseBlockchainDate'

export const isProposalExecutable = (proposal: Proposal) => {
  return (
    proposal.state === ProposalState.Queued &&
    proposal.executableFrom &&
    parseBlockchainDate(proposal.executableFrom) < new Date()
  )
}
