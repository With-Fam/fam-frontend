// Framwork
import Link from 'next/link'

// Local Components
import ActivitysComments from '@/components/community/CommunityActivity/ActivityComments'
import ActivityDescription from '@/components/community/CommunityActivity/ActivityDescription'
import VotingComponent from '@/components/community/CommunityActivity/VotingComponent'
import ActivityData from '@/components/community/CommunityActivity/ActivityData'
import { CreateActivityButton } from '@/components/community'
import { Paragraph } from '@/stories'

// Types
import type {
  ProposalFragment,
  ProposalQuery,
} from '@/data/subgraph/sdk.generated'
type CommunityActivityProps = {
  proposals: ProposalFragment[]
  communityName: string
  chainId: number
}

// Utils
import { formatUnixTimestampDate, isDateExpired } from '@/utils/helpers'
import PointyTopIcon from '@/components/icons/PointyTopIcon'
import VoteButtonHandle from '@/components/community/activity/ActivitySection/VoteButtonHandle'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityActivity = ({
  proposals,
  communityName,
  chainId,
}: CommunityActivityProps): JSX.Element => (
  <section className="relative mx-auto max-w-[936px] px-4 pb-4 sm:pb-10">
    {proposals.length > 0 &&
      proposals.map((proposal, index) => (
        <div key={index} className="relative z-0 mb-8 rounded-lg bg-white p-4">
          <div className="flex gap-4">
            <VotingComponent
              proposal={proposal}
              active={isDateExpired(proposal.expiresAt)}
            />
            <Link
              href={`activity/${proposal.proposalId}`}
              passHref
              className="w-full"
            >
              <ActivityData chainId={chainId} proposal={proposal as any} />
              <ActivityDescription>{proposal.description}</ActivityDescription>
              <ActivitysComments
                proposal={proposal as ProposalQuery['proposal'] | null}
              />
              <Paragraph
                as="p5"
                className="absolute bottom-0 right-4 z-0 mb-4 text-grey"
              >
                {formatUnixTimestampDate(proposal.timeCreated)}
              </Paragraph>
            </Link>
          </div>
        </div>
      ))}
    {proposals.length === 0 && (
      <div className="mx-auto mb-8 flex w-64 flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-grey-light">
          <PointyTopIcon color="#F54D18" className="h-8 w-8" />
        </div>
        <Paragraph as="p3" className="text-center text-grey-dark">
          {communityName} hasn&apos;t posted any activities yet
        </Paragraph>
      </div>
    )}
    <CreateActivityButton />
    <VoteButtonHandle chainId={chainId} />
  </section>
)

export default CommunityActivity
