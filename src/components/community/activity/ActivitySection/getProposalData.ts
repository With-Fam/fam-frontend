import { SDK } from '@/data/subgraph/client'
import { ProposalQuery } from '@/data/subgraph/sdk.generated'

export async function getProposalData(chainId: number, proposalId: string) {
  const { proposal } = await SDK.connect(chainId).proposal({
    proposalId,
  })

  if (typeof proposal?.proposalId === 'string') {
    return proposal as ProposalQuery['proposal']
  } else {
    return null
  }
}
