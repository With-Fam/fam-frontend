'use client'

import useVoteProposal from '@/hooks/useVoteProposal'
import { useState } from 'react'
import { Address } from 'viem'

interface VoteButtonProps {
  proposal: any
  community: Address
  callback: any
}

const VoteButton = ({
  proposal,
  community,
  callback,
}: VoteButtonProps): JSX.Element => {
  const { vote } = useVoteProposal()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await vote(proposal, community)
    callback()
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
