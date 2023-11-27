// Framework
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Local Components
import { Paragraph, PollComponent } from '@/stories'
const ActivityCreator = dynamic(
  () => import('@/components/community/CommunityActivity/ActivityCreator'),
  {
    ssr: false,
  }
)

// Types
import { ProposalFragment } from '@/data/subgraph/sdk.generated'
interface ActivityDataProps {
  proposal: ProposalFragment
}

// Utils
import { formatUnixTimestampDate, isDateExpired } from '@/utils/helpers'
import UsersRowDynamic from '@/components/community/UsersRowDynamic'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityData = ({ proposal }: ActivityDataProps): JSX.Element => {
  const {
    title,
    proposer,
    proposalId,
    timeCreated,
    votes,
    quorumVotes,
    forVotes,
    againstVotes,
    abstainVotes,
    voteEnd,
  } = proposal
  const sumOfVotes = forVotes + againstVotes + abstainVotes

  let status: null | 'passed' | 'rejected' | 'expired' = null

  if (isDateExpired(voteEnd)) {
    if (sumOfVotes < Number(quorumVotes)) {
      status = 'expired'
    } else if (forVotes > againstVotes) {
      status = 'passed'
    } else {
      status = 'rejected'
    }
  }

  return (
    <>
      <ActivityCreator proposer={proposer} />
      <Link href={`activity/${proposalId}`} passHref>
        <Paragraph as="p3" className="mb-1">
          {title}
        </Paragraph>
      </Link>
      <Paragraph as="p5" className="mb-4 text-grey">
        {formatUnixTimestampDate(timeCreated)}
      </Paragraph>
      <div className="flex">
        <div className="w-max">
          <UsersRowDynamic
            votes={votes.slice(0, 5)}
            text={`${sumOfVotes} Votes`}
          />
        </div>
        <div className="relative right-0 top-0 flex flex-1 justify-end sm:absolute sm:right-4 sm:top-4">
          <PollComponent status={status} />
        </div>
      </div>
    </>
  )
}

export default ActivityData
