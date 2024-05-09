import { CreateActivityButton } from '@/components/community'
import { Paragraph } from '@/stories'
import type { ProposalFragment } from '@/data/subgraph/sdk.generated'
type CommunityActivityProps = {
  proposals: any[]
  communityName: string
  chainId: number
  community: Address
}
import PointyTopIcon from '@/components/icons/PointyTopIcon'
import VoteButtonHandle from '@/components/community/activity/ActivitySection/VoteButtonHandle'
import ExecuteButton from '@/components/community/CommunityActivity/ExecuteButton'
import { Address } from 'viem'
import VetoButton from '@/components/community/CommunityActivity/VetoButton'

const CommunityActivity = ({
  proposals,
  communityName,
  chainId,
  community,
}: CommunityActivityProps): JSX.Element => (
  <section className="relative mx-auto max-w-[936px] px-4 pb-4 sm:pb-10">
    {proposals.length > 0 &&
      proposals.map((proposal, index) => (
        <div key={index} className="relative z-0 mb-8 rounded-lg bg-white p-4">
          <div className="flex gap-4">
            PARTY PROPOSAL #{index + 1}
            <ExecuteButton proposal={proposal} community={community} />
            <VetoButton
              proposalId={proposal?.decodedData?.args?.proposalId}
              community={community}
            />
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
