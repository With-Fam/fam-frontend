'use client'

// Framework
import { useState } from 'react'

// Local Components
import { Paragraph } from '@/stories'
import { CheckMark, XMark } from '@/components/icons'
import VoteButton from '@/components/community/CommunityActivity/VoteButton'

// Types
interface VotingProps {
  votes: number
  active: boolean
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VotingComponent = ({ votes, active }: VotingProps): JSX.Element => {
  const halfVotes = Math.floor(votes / 2)
  const isEven = votes % 2 === 0

  const [downVotes, setDownVotes] = useState(halfVotes)
  const [upVotes, setUpVotes] = useState(isEven ? halfVotes : halfVotes + 1)

  const handleUpVote = () => {
    active && setUpVotes(upVotes + 1)
  }

  const handleDownVote = () => {
    active && setDownVotes(downVotes + 1)
  }

  return (
    <div className="hidden items-center justify-start gap-2 sm:flex sm:flex-col">
      <VoteButton
        count={upVotes}
        handleClick={handleUpVote}
        icon={<CheckMark />}
        textColor={'text-status-green'}
        active={active}
      />
      <Paragraph as="p5" className="text-grey">
        {downVotes + upVotes}
      </Paragraph>
      <VoteButton
        count={downVotes}
        handleClick={handleDownVote}
        icon={<XMark />}
        textColor={'text-status-red'}
        active={active}
      />
    </div>
  )
}

export default VotingComponent
