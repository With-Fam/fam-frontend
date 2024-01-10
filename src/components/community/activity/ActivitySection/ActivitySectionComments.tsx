// Framework
import dynamic from 'next/dynamic'

// Third Parties
import { twJoin } from 'tailwind-merge'

// Components
const CommentItem = dynamic(
  () => import('@/components/community/activity/ActivitySection/CommentItem'),
  {
    ssr: false,
  }
)

// Types
import { ProposalQuery, ProposalVote } from '@/data/subgraph/sdk.generated'
type ActivitySectionCommentsProps = {
  proposal: ProposalQuery['proposal'] | null
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivitySectionComments = ({
  proposal,
}: ActivitySectionCommentsProps): JSX.Element => {
  const voteToRender = proposal?.votes.filter((vote) => vote.reason)

  if (voteToRender?.length === 0) {
    return <></>
  }

  return (
    <div className="rounded-lg bg-white p-3">
      {voteToRender?.map((vote, index) => {
        return (
          <div
            key={index}
            className={twJoin(
              'py-3',
              index < voteToRender.length - 1
                ? 'border-b border-solid border-b-grey-light'
                : ''
            )}
          >
            <div className="flex gap-2">
              <CommentItem vote={vote as ProposalVote} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ActivitySectionComments
