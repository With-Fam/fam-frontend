'use client'

// Local Components
import { Paragraph } from '@/stories'

// Types
import {
  ProposalFragment,
  ProposalVoteFragment,
} from '@/data/subgraph/sdk.generated'
interface CountToStartProps {
  proposal: ProposalFragment & {
    votes: ProposalVoteFragment[]
  }
}

// Utils
import { useCountdown } from '@/hooks/useCountdown'
import { fromSeconds } from '@/utils/helpers'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CountToStart = ({ proposal }: CountToStartProps): JSX.Element => {
  const timeToStart = fromSeconds(
    Math.floor(proposal.voteStart - new Date().getTime() / 1000)
  )

  return (
    <div className="w-max rounded-3xl bg-orange-500/10 px-2 py-1">
      <Paragraph as="p6" className="font-bold text-orange">
        {timeToStart.days}d {timeToStart.hours}h {timeToStart.minutes}m{' '}
        {timeToStart.seconds}s
      </Paragraph>
    </div>
  )
}

export default CountToStart
