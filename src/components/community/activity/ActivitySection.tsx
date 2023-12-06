'use client'

// Framework
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Local Components
import { Paragraph, PollComponent } from '@/stories'
import { Button } from '@/components/shared'
import { VoteBlock } from '@/components/community/activity'
import { ExternalLink } from '@/components/icons'
import BackActivityButton from '@/components/community/activity/BackActivityButton'
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
type ActivitySectionProps = {
  proposal: ProposalFragment | null
}

// Context
import { useMockStoreContext } from '@/contexts/mock-store'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivitySection = ({ proposal }: ActivitySectionProps): JSX.Element => {
  const { widgets } = useMockStoreContext()

  if (!proposal) {
    return (
      <section className="p-4">
        <Paragraph as="p3">No action found</Paragraph>
      </section>
    )
  }

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

  const widget = widgets.find((widget) => widget.id === proposal.proposalId)

  return (
    <section className="mx-auto max-w-2xl p-5">
      <BackActivityButton />
      <div className="flex flex-col gap-6">
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
              <Button type="button" className="hidden w-20 px-3 py-2 sm:block">
                <Paragraph as="p5">Vote</Paragraph>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <VoteBlock votes={proposal.forVotes} direction="Yes" />
          <VoteBlock votes={proposal.againstVotes} direction="No" />
        </div>
        {proposal.description && (
          <div>
            {proposal.description.split('\\n').map((paragraph, index) => (
              <Paragraph key={index} as="p4" className="mb-2">
                {paragraph}
              </Paragraph>
            ))}
          </div>
        )}
        <div>
          <Link
            className="flex text-orange"
            href={`/community/actions`}
            passHref
          >
            <Paragraph as="p5">Actions</Paragraph>
            <span>
              <ExternalLink color="#F54D18" />
            </span>
          </Link>
        </div>
        {widget && (
          <div className="box-content w-full sm:w-[322px]">
            <div className="relative flex gap-4 rounded-2xl bg-white p-4">
              <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-grey-light">
                {widget.image && (
                  <Image
                    src={widget.image}
                    fill
                    className="rounded-md object-cover"
                    alt=""
                  />
                )}
              </div>
              <div className="text-left">
                <Paragraph as="p3" className="mb-2">
                  {widget.title}
                </Paragraph>
                <Paragraph as="p5" className="text-grey">
                  {widget['action-title']}
                </Paragraph>
              </div>
            </div>
          </div>
        )}
        <Button type="button" className="block sm:hidden">
          Vote
        </Button>
        <div className="rounded-s-lg bg-white p-3">
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Add a comment"
            className="w-full rounded-md bg-grey-light p-2 font-abc text-sm text-black outline-none placeholder:text-grey-dark"
          />
        </div>
      </div>
    </section>
  )
}

export default ActivitySection
