'use client'

// Framework
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Local Components
import { Paragraph, PollComponent } from '@/stories'
const ActivityCreator = dynamic(
  () => import('@/components/community/CommunityActivity/ActivityCreator'),
  {
    ssr: false,
  }
)

// Types
import {
  ProposalFragment,
  ProposalVoteFragment,
} from '@/data/subgraph/sdk.generated'
interface ActivityDataProps {
  proposal: ProposalFragment & {
    votes: ProposalVoteFragment[]
  }
  chainId: number
}

// Utils
import { getProposalState } from '@/data/contract/requests/getProposalState'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityData = ({
  proposal,
  chainId,
}: ActivityDataProps): JSX.Element => {
  const [state, setState] = useState<number | null>(null)
  const proposalId = proposal.proposalId
  const governorAddress = proposal.dao.governorAddress

  const {
    title,
    proposer,
  } = proposal

  useEffect(() => {
    if (governorAddress && proposalId) {
      getProposalState(chainId, governorAddress, proposalId).then((data) => {
        setState(data)
      })
    }
  }, [proposal, chainId, proposalId, governorAddress])

  return (
    <>
      <ActivityCreator proposer={proposer} />
      <Paragraph as="p3" className="mb-1">
        {title}
      </Paragraph>
      <div className="flex">
        <div className="relative right-0 top-0 flex flex-1 justify-end sm:absolute sm:right-4 sm:top-4">
          <PollComponent state={state} />
        </div>
      </div>
    </>
  )
}

export default ActivityData
