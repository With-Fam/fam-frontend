// Local Components
import ActivitysComments from '@/components/community/CommunityActivity/ActivityComments'
import ActivityDescription from '@/components/community/CommunityActivity/ActivityDescription'
import VotingComponent from '@/components/community/CommunityActivity/VotingComponent'
import ActivityData from '@/components/community/CommunityActivity/ActivityData'
import { CreateActivityButton } from '@/components/community'

// Types
import type { ProposalFragment } from '@/data/subgraph/sdk.generated'
type CommunityActivityProps = {
  proposals: ProposalFragment[]
}

// Utils
import { isDateExpired } from '@/utils/helpers'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityActivity = ({
  proposals,
}: CommunityActivityProps): JSX.Element => (
  <section className="relative mx-auto max-w-[936px] px-4 pb-4 sm:pb-10">
    {proposals.map((proposal, index) => {
      return (
        <div key={index} className="relative z-0 mb-2 rounded-lg bg-white p-4">
          <div className="flex gap-4">
            <VotingComponent
              proposal={proposal}
              active={isDateExpired(proposal.expiresAt)}
            />
            <div className="w-full">
              <ActivityData proposal={proposal as any} />
              <ActivityDescription>{proposal.description}</ActivityDescription>
              <ActivitysComments comments={[]} />
            </div>
          </div>
        </div>
      )
    })}
    <CreateActivityButton />
  </section>
)

export default CommunityActivity
