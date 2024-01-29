// Local Components
import { Paragraph } from '@/stories'
import { ChatBox } from '@/components/icons'

// Types
import { ProposalQuery } from '@/data/subgraph/sdk.generated'
interface CommentsProps {
  proposal: ProposalQuery['proposal'] | null
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityComments = ({ proposal }: CommentsProps): JSX.Element => {
  const votesArray = proposal?.votes.filter((vote) => vote.reason)

  return (
  <div className="hidden cursor-pointer sm:flex">
    <ChatBox />
    <Paragraph as="p5" className="ml-1 text-grey">
      {votesArray ? votesArray.length : '0'} comments
    </Paragraph>
  </div>
)}

export default ActivityComments
