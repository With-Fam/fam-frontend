'use client'

import { useProposalProvider } from '@/contexts/ProposalProvider'
import useVoteProposal from '@/hooks/useVoteProposal'
import { useState } from 'react'
import { Address } from 'viem'

interface VoteButtonProps {
  proposal: any
  community: Address
}

const VoteButton = ({ proposal, community }: VoteButtonProps): JSX.Element => {
  const { vote } = useVoteProposal()
  const [loading, setLoading] = useState(false)
  const { getProposals } = useProposalProvider() as any

  const handleClick = async () => {
    setLoading(true)
    await vote(proposal, community)
    getProposals()
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-full border px-4 py-1 text-green"
      disabled={loading}
    >
      {loading ? 'Voting...' : 'Vote'}
    </button>
  )
}

export default VoteButton
