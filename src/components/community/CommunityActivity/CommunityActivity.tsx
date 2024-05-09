import { CreateActivityButton } from '@/components/community'
type CommunityActivityProps = {
  proposals: any[]
  communityName: string
  chainId: number
  community: Address
}
import VoteButtonHandle from '@/components/community/activity/ActivitySection/VoteButtonHandle'
import { Address } from 'viem'
import MissingActivities from '@/components/community/CommunityActivity/MissingActivities'
import Proposal from '@/components/community/CommunityActivity/Proposal'

const CommunityActivity = ({
  proposals,
  communityName,
  chainId,
  community,
}: CommunityActivityProps): JSX.Element => (
  <section className="relative mx-auto max-w-[936px] px-4 pb-4 sm:pb-10">
    {proposals.length > 0 &&
      proposals.map((proposal, index) => (
        <Proposal key={index} proposal={proposal} community={community} />
      ))}
    {proposals.length === 0 && (
      <MissingActivities communityName={communityName} />
    )}
    <CreateActivityButton />
    <VoteButtonHandle chainId={chainId} />
  </section>
)

export default CommunityActivity
