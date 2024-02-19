'use client'

// Local Components
import { Paragraph } from '@/stories'

// Types
import {
  ProposalFragment,
  ProposalVoteFragment,
} from '@/data/subgraph/sdk.generated'
interface CountToEndProps {
  proposal: ProposalFragment & {
    votes: ProposalVoteFragment[]
  }
}

// Utils
import { useCountdown } from '@/hooks/useCountdown'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CountToEnd = ({ proposal }: CountToEndProps): JSX.Element => {
  const { countdownString } = useCountdown(proposal.voteEnd, () => {})

  return (
    <div className="w-max rounded-3xl bg-orange-500/10 px-2 py-1">
      <Paragraph as="p6" className="text-orange">
        {countdownString}
      </Paragraph>
    </div>
  )
}

export default CountToEnd
