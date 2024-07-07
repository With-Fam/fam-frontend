'use client'

import useVotingStatus from '@/hooks/useVotingStatus'
import useVoteProposal from '@/hooks/useVoteProposal'
import { useState } from 'react'
import { Address } from 'viem'
import { Icon } from '@/components/Icon'

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
  const { isVoter } = useVotingStatus(proposal)
  const buttonLabel = isVoter ? (
    <div className="flex items-center gap-1">
      <Icon id="check" fill="#45D039" />
      Voted
    </div>
  ) : (
    'Vote Yes'
  )
  const className = isVoter
    ? 'text-green bg-green-light'
    : 'text-white bg-black'

  const handleClick = async () => {
    if (isVoter) return
    setLoading(true)
    await vote(proposal, community)
    callback()
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded-full px-6 py-3 text-[20px] ${className}`}
      disabled={loading}
    >
      {loading ? 'Voting...' : buttonLabel}
    </button>
  )
}

export default VoteButton
