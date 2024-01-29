'use client'

// Framework
import dynamic from 'next/dynamic'

// Third Parties
import { twJoin } from 'tailwind-merge'

// Components
import { Paragraph } from '@/stories'
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})
const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})

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
  return (
    <>
      <div className="flex flex-col items-center">
        <UserAvatar address={vote.voter} width={24} height={24} />
      </div>
      <div className="w-full">
        <div className="flex items-center">
          <div className="flex flex-1 items-center justify-start gap-1">
            <UserName address={vote.voter} className="font-abcMedium" />
            {vote.support && (
              <p
                className={twJoin(
                  'rounded-lg px-1 py-0.5 font-abcMedium',
                  vote.support === 'FOR'
                    ? 'bg-status-green bg-opacity-10 text-xxs text-status-green'
                    : 'bg-status-red bg-opacity-10 text-xxs text-status-red'
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
