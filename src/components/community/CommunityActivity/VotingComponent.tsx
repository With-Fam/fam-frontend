// Local Components
import { Paragraph } from '@/stories'
import { CheckMark, XMark } from '@/components/icons'
import VoteButton from '@/components/community/CommunityActivity/VoteButton'

// Types
import { ProposalFragment } from '@/data/subgraph/sdk.generated'
interface VotingProps {
  proposal: ProposalFragment
  active: boolean
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VotingComponent = ({ proposal, active }: VotingProps): JSX.Element => (
  <div className="hidden items-center justify-start gap-2 sm:flex sm:flex-col">
    <VoteButton
      count={proposal.forVotes}
      title={proposal.title}
      voteType="for"
      icon={<CheckMark />}
      textColor={'text-status-green'}
      active={active}
    />
    <Paragraph as="p5" className="text-grey">
      {proposal.forVotes + proposal.againstVotes}
    </Paragraph>
    <VoteButton
      count={proposal.againstVotes}
      title={proposal.title}
      voteType="against"
      icon={<XMark />}
      textColor={'text-status-red'}
      active={active}
    />
  </div>
)

export default VotingComponent
