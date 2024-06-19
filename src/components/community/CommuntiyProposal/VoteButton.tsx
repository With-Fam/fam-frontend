'use client'

import useVoteProposal from '@/hooks/useVoteProposal'
import { useState } from 'react'
import { Address } from 'viem'

interface VoteButtonProps {
  proposal: any
  community: Address
}

const VoteButton = ({ proposal, community }: VoteButtonProps): JSX.Element => {
  const { vote } = useVoteProposal()
  const [isVoted, setIsVoted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const response = await vote(proposal, community)
    const { error } = response as any
    if (!error) setIsVoted(true)
    setLoading(false)
  }

  if (isVoted) return <div />

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
