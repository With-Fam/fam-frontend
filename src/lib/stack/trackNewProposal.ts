import { Address } from 'viem'

interface TrackNewProposalParams {
  title: string
  description: string
  proposalId?: string
  partyAddress: Address
  txHash: string
}

interface TrackNewProposalResult {
  success?: boolean
  error?: unknown
}

export const trackNewProposal = async ({
  title,
  description,
  proposalId,
  partyAddress,
  txHash,
}: TrackNewProposalParams): Promise<TrackNewProposalResult> => {
  try {
    const response = await fetch('/api/stack/track/proposal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        proposalId,
        partyAddress,
        txHash,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to track proposal')
    }

    const data = await response.json()
    return { success: data.success }
  } catch (error) {
    console.error('Failed to track new proposal:', error)
    return { error }
  }
}
