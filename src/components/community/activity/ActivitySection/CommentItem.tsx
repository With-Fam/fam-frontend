'use client'

// Third Parties
import { twJoin } from 'tailwind-merge'

// Components
import { ChatBox, HeartIcon } from '@/components/icons'
import { Paragraph } from '@/stories'
import { UserAvatar } from '@/components/shared'

// Helpers
import { useEnsData } from '@/hooks/useEnsData'

// Type
import { ProposalVote } from '@/data/subgraph/sdk.generated'
type CommentItemProps = {
  vote: ProposalVote
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommentItem = ({ vote }: CommentItemProps): JSX.Element => {
  const { displayName, ensAvatar } = useEnsData(vote.voter)

  return (
    <>
      <div className="flex flex-col items-center">
        <UserAvatar
          address={vote.voter}
          width={24}
          height={24}
          ensAvatar={ensAvatar}
        />
      </div>
      <div className="w-full">
        <div className="flex items-center">
          <div className="flex flex-1 items-center justify-start gap-1">
            <Paragraph as="p5" className="font-abcMedium">
              {displayName}
            </Paragraph>
            {vote.support && (
              <p
                className={twJoin(
                  'rounded-lg px-1 py-0.5 font-abcMedium',
                  vote.support === 'FOR'
                    ? 'text-xxs bg-status-green bg-opacity-10 text-status-green'
                    : 'text-xxs bg-status-red bg-opacity-10 text-status-red'
                )}
              >
                {vote.support === 'FOR' && 'Yes'}
                {vote.support === 'AGAINST' && 'No'}
              </p>
            )}
            <p className="text-xxs text-grey">{vote.weight} votes</p>
          </div>
        </div>
        <div className="mt-1.5">
          <Paragraph as="p5">{vote.reason}</Paragraph>
        </div>
      </div>
    </>
  )
}

export default CommentItem
