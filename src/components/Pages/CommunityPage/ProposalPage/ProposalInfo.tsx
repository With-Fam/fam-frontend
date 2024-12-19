import { useProposalMetadata } from '@/hooks/useProposalMetadata'

interface ProposalInfoProps {
  proposal: {
    id: string
    party: {
      address: string
    }
  }
}

export const ProposalInfo = ({ proposal }: ProposalInfoProps) => {
  const { metadata, loading, error } = useProposalMetadata(
    proposal.party.address,
    proposal.id
  )

  if (loading) {
    return <div>Loading proposal details...</div>
  }

  if (error) {
    return <div>Error loading proposal details</div>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        {metadata?.title || 'Untitled Proposal'}
      </h1>
      <p className="text-gray-600">
        {metadata?.description || 'No description available'}
      </p>
    </div>
  )
}
