'use client'

// Framework
import dynamic from 'next/dynamic'

// Local Components
import { Paragraph, PollComponent } from '@/stories'
import { Button } from '@/components/shared'
import { VoteBlock } from '@/components/community/activity'
const ActivityCreator = dynamic(
  () => import('@/components/community/CommunityActivity/ActivityCreator'),
  {
    ssr: false,
  }
)

// Utils
import { formatUnixTimestampDate, isDateExpired } from '@/utils/helpers'

// Types
import { ProposalFragment } from '@/data/subgraph/sdk.generated'
import Link from 'next/link'
import ActivityQueue from '@/components/community/CommunityActivity/ActivityQueue'
type ActivitySectionInfoProps = {
  proposal: ProposalFragment
  chainId: number
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivitySectionInfo = ({
  proposal,
  chainId,
}: ActivitySectionInfoProps): JSX.Element => {
  const {
    proposer,
    quorumVotes,
    forVotes,
    againstVotes,
    abstainVotes,
    voteEnd,
    timeCreated,
    title,
  } = proposal
  const sumOfVotes = forVotes + againstVotes + abstainVotes
  const rateFor = forVotes / sumOfVotes
  const rateAgainst = againstVotes / sumOfVotes
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
      <div>
        <div className="flex justify-between pb-2 pt-5">
          <ActivityCreator
            proposer={proposer}
            className="mb-2 flex items-center gap-2 md:mb-0"
          />
          <Paragraph as="p5" className="mb-4 text-grey">
            {formatUnixTimestampDate(timeCreated)}
          </Paragraph>
        </div>
        <div className="flex justify-between">
          <div>
            <Paragraph as="p3" className="mb-1">
              {title}
            </Paragraph>
            <div className="flex flex-1 justify-start">
              <PollComponent status={status} />
            </div>
          </div>
          <div>
            <Link
              href={{ pathname: null, query: { voting: true, title } }}
              passHref
            >
              <Button type="button" className="hidden w-20 px-3 py-2 sm:block">
                <Paragraph as="p5">Vote</Paragraph>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <ActivityQueue proposal={proposal} chainId={chainId} />
      <div className="flex w-full gap-2">
        <VoteBlock votes={proposal.forVotes} rate={rateFor} direction="Yes" />
        <VoteBlock
          votes={proposal.againstVotes}
          rate={rateAgainst}
          direction="No"
        />
      </div>
    </>
  )
}

export default ActivitySectionInfo
