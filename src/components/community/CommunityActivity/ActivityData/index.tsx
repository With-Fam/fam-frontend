// Framework
import dynamic from 'next/dynamic'

// Local Components
import { Paragraph } from '@/stories'
const ActivityCreator = dynamic(
  () => import('@/components/community/CommunityActivity/ActivityCreator'),
  {
    ssr: false,
  }
)
import ManageStateTime from '@/components/community/CommunityActivity/ActivityData/ManageStateTime'

// Types
import {
  ProposalFragment,
  ProposalVoteFragment,
} from '@/data/subgraph/sdk.generated'
interface ActivityDataProps {
  proposal: ProposalFragment & {
    votes: ProposalVoteFragment[]
  }
  chainId: number
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityData = ({
  proposal,
  chainId,
}: ActivityDataProps): JSX.Element => {
  const { title, proposer } = proposal

  return (
    <>
      <ActivityCreator proposer={proposer} />
      <Paragraph as="p3" className="mb-1 font-bold">
        {title}
      </Paragraph>
      <div className="flex">
        <div className="absolute right-4 top-4 flex flex-1 flex-col justify-end gap-2">
          <ManageStateTime proposal={proposal} chainId={chainId} />
        </div>
      </div>
    </>
  )
}

export default ActivityData
