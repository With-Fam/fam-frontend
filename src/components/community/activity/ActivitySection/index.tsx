'use client'

// Framework
import Link from 'next/link'

// Local Components
import { Paragraph } from '@/stories'
import { Button } from '@/components/shared'
import BackActivityButton from '@/components/community/activity/BackActivityButton'

// Types
import { ProposalQuery } from '@/data/subgraph/sdk.generated'
type ActivitySectionProps = {
  chainId: number
  proposal: ProposalQuery['proposal'] | null
}

// Context
import { useMockStoreContext } from '@/contexts/mock-store'
import ActivitySectionWidget from '@/components/community/activity/ActivitySection/ActivitySectionWidget'
import ActivitySectionComments from '@/components/community/activity/ActivitySection/ActivitySectionComments'
import ActivitySectionInfo from '@/components/community/activity/ActivitySection/ActivitySectionInfo'
import VoteButtonHandle from '@/components/community/activity/ActivitySection/VoteButtonHandle'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivitySection = ({
  proposal,
  chainId,
}: ActivitySectionProps): JSX.Element => {
  const { widgets } = useMockStoreContext()

  if (!proposal) {
    return (
      <section className="p-4">
        <Paragraph as="p3">No action found</Paragraph>
      </section>
    )
  }

  const widget = widgets.find((widget) => widget.id === proposal.proposalId)

  return (
    <section className="mx-auto max-w-2xl p-5">
      <BackActivityButton />
      <div className="flex flex-col gap-6">
        <ActivitySectionInfo proposal={proposal} chainId={chainId} />
        {proposal.description && (
          <div className="external-content">
            {proposal.description.split('\\n').map((paragraph, index) => (
              <div key={index} className="mb-2">
                <div dangerouslySetInnerHTML={{ __html: paragraph }} />
              </div>
            ))}
          </div>
        )}
        {widget && <ActivitySectionWidget widget={widget} />}
        <Link
          href={{
            pathname: null,
            query: { voting: true, title: proposal.title },
          }}
          className="w-full"
          passHref
        >
          <Button type="button" className="block w-full sm:hidden">
            <Paragraph as="p5">Vote</Paragraph>
          </Button>
        </Link>
        <ActivitySectionComments proposal={proposal} />
        <VoteButtonHandle chainId={chainId} />
      </div>
    </section>
  )
}

export default ActivitySection
