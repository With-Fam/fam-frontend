import stack from '@/lib/stack/client'
import { Address } from 'viem'

interface TrackNewProposalParams {
  title: string
  description: string
  proposalId?: string
  partyAddress: Address
  chainId: number
}

export const trackNewProposal = async ({
  title,
  description,
  proposalId,
  partyAddress,
  chainId,
}: TrackNewProposalParams) => {
  try {
    await stack.track('new_proposal', {
      points: 1,
      account: partyAddress,
      uniqueId: `${chainId}-${partyAddress}-${proposalId}`,
      metadata: {
        title,
        description,
        proposal_id: proposalId,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to track new proposal:', error)
    return { error }
  }
}
