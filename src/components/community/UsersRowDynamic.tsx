// Framework
import dynamic from 'next/dynamic'

// Types
import { ProposalVoteFragment } from '@/data/subgraph/sdk.generated'
interface UsersRowProps {
  votes: ProposalVoteFragment[]
  text: string
}

// Components
import Paragraph from '@/stories/Paragraph'
const VoteImage = dynamic(
  () => import('@/components/community/CommunityActivity/VoteImage'),
  {
    ssr: false,
  }
)

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const UsersRow = ({ votes, text }: UsersRowProps): JSX.Element => (
  <div className="flex w-full items-center">
    {votes.map((vote, index) => (
      <VoteImage
        voter={vote.voter}
        key={index}
        marginLeft={index > 0 ? '-ml-2' : ''}
      />
    ))}
    <Paragraph as="p4" className="ml-1 flex-1 text-right text-grey-dark">
      {text}
    </Paragraph>
  </div>
)

export default UsersRow
