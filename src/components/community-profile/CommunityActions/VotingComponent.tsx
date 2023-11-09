'use client'

// Framework
import { useState } from 'react'

// Local Components
import { Paragraph } from '@/stories'
import { CheckMark, XMark } from '@/components/icons'
import VoteButton from '@/components/community-profile/CommunityActions/VoteButton'

// Types
interface VotingProps {
  votes: number
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityActions = ({ votes }: VotingProps): JSX.Element => {
  const halfVotes = Math.floor(votes / 2)
  const isEven = votes % 2 === 0

  const [downVotes, setDownVotes] = useState(halfVotes)
  const [upVotes, setUpVotes] = useState(isEven ? halfVotes : halfVotes + 1)

  const handleUpVote = () => {
    setUpVotes(upVotes + 1)
  }

  const handleDownVote = () => {
    setDownVotes(downVotes + 1)
  }

  return (
    <div className="hidden items-center justify-start gap-2 sm:flex sm:flex-col">
      <VoteButton
        count={upVotes}
        handleClick={handleUpVote}
        icon={<CheckMark />}
        textColor={'text-status-green'}
      />
      <Paragraph as="p5" className="text-grey">
        {downVotes + upVotes}
      </Paragraph>
      <VoteButton
        count={downVotes}
        handleClick={handleDownVote}
        icon={<XMark />}
        textColor={'text-status-red'}
      />
    </div>
  )
}

export default CommunityActions
