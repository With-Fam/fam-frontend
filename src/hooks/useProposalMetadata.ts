import { useState, useEffect } from 'react'
import { Address } from 'viem'

interface ProposalMetadata {
  title: string
  description: string
  proposalId: string
  txHash: string
}

export const useProposalMetadata = (partyAddress: Address) => {
  const [metadata, setMetadata] = useState<Record<string, ProposalMetadata>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/stack/proposal/${partyAddress}`)

        if (!response.ok) {
          throw new Error('Failed to fetch proposal metadata')
        }

        const events = await response.json()

        const proposalMap = events.reduce(
          (acc: Record<string, ProposalMetadata>, event: any) => {
            acc[event.metadata.proposalId] = {
              title: event.metadata.title,
              description: event.metadata.description,
              proposalId: event.metadata.proposalId,
              txHash: event.metadata.txHash,
            }
            return acc
          },
          {}
        )

        setMetadata(proposalMap)
      } catch (err) {
        console.error('Error fetching proposal metadata:', err)
        setError('Failed to fetch proposal metadata')
      } finally {
        setLoading(false)
      }
    }

    if (partyAddress) {
      fetchMetadata()
    }
  }, [partyAddress])

  return { metadata, loading, error }
}
