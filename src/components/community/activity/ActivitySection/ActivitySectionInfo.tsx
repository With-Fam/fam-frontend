'use client'

// Framework
import dynamic from 'next/dynamic'

// Local Components
import { Paragraph } from '@/stories'
import { VoteBlock } from '@/components/community/activity'
import ShowVoteManager from '@/components/community/activity/ActivitySection/ShowVoteManager'
import ActivityStateActions from '@/components/community/CommunityActivity/ActivityStateActions'
const ActivityCreator = dynamic(
  () => import('@/components/community/CommunityActivity/ActivityCreator'),
  {
    ssr: false,
  }
)

// Types
import type {
  ProposalFragment,
  ProposalVote,
  ProposalVoteFragment,
} from '@/data/subgraph/sdk.generated'
import type { AddressType } from '@/types'
type ActivitySectionInfoProps = {
  proposal: ProposalFragment
  chainId: number
  state: number | null
  signerVote?: ProposalVote
  proposalId: string
  governorAddress: AddressType
  userAddress: AddressType
}

// Helpers
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { formatUnixTimestampDate } from '@/utils/helpers'
import ManageStateTime from '@/components/community/CommunityActivity/ActivityData/ManageStateTime'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivitySectionInfo = ({
  proposal,
  chainId,
  state,
  governorAddress,
  proposalId,
  signerVote,
  userAddress,
}: ActivitySectionInfoProps): JSX.Element => {
  const { isAuthenticated } = useCheckAuth()
  const { proposer, forVotes, againstVotes, abstainVotes, timeCreated, title } =
    proposal
  const sumOfVotes = forVotes + againstVotes + abstainVotes
  const rateFor = forVotes / sumOfVotes
  const rateAgainst = againstVotes / sumOfVotes

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
            <Paragraph as="p3" className="mb-2 font-bold">
              {title}
            </Paragraph>
            <div className="flex gap-2 flex-1 justify-start">
              <ManageStateTime
                proposal={
                  proposal as ProposalFragment & {
                    votes: ProposalVoteFragment[]
                  }
                }
                chainId={chainId}
              />
            </div>
          </div>
          {isAuthenticated && (
            <ShowVoteManager
              state={state}
              chainId={chainId}
              governorAddress={governorAddress}
              userAddress={userAddress as AddressType}
              timeCreated={proposal.timeCreated}
              proposalId={proposalId}
              signerVote={signerVote}
              className="hidden w-20 px-3 py-2 sm:block"
              href={{ pathname: null, query: { voting: true, title } }}
            />
          )}
        </div>
      </div>
      <ActivityStateActions proposal={proposal} chainId={chainId} />
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
