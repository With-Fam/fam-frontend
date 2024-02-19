'use client'

// Framework
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

// Local Components
import { PollComponent } from '@/stories'
const CountToEnd = dynamic(
  () =>
    import('@/components/community/CommunityActivity/ActivityData/CountToEnd')
)
const CountToStart = dynamic(
  () =>
    import('@/components/community/CommunityActivity/ActivityData/CountToStart')
)

// Types
import {
  ProposalFragment,
  ProposalVoteFragment,
} from '@/data/subgraph/sdk.generated'
interface ManageStateTimeProps {
  proposal: ProposalFragment & {
    votes: ProposalVoteFragment[]
  }
  chainId: number
}

// Utils
import {
  ProposalState,
  getProposalState,
} from '@/data/contract/requests/getProposalState'
import { useCountdown } from '@/hooks/useCountdown'
import { getTimeDifference } from '@/utils/helpers'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ManageStateTime = ({
  proposal,
  chainId,
}: ManageStateTimeProps): JSX.Element => {
  const [state, setState] = useState<number | null>(null)
  const proposalId = proposal.proposalId
  const governorAddress = proposal.dao.governorAddress
  const { ended: isStarted } = getTimeDifference(proposal.voteStart)
  const { isEnded } = useCountdown(proposal.voteEnd, () => {})

  const refreshState = useCallback(() => {
    getProposalState(chainId, governorAddress, proposalId).then((data) => {
      setState(data)
    })
  }, [isEnded, isStarted])

  useEffect(() => {
    if (governorAddress && proposalId) {
      refreshState()
    }
  }, [proposal, chainId, proposalId, governorAddress])

  useEffect(() => {
    if (state === ProposalState.Active && isEnded) {
      refreshState()
    }

    if (state === ProposalState.Pending && isStarted) {
      refreshState()
    }
  }, [isEnded, isStarted])

  return (
    <>
      <PollComponent state={state} />
      {!isEnded && isStarted && <CountToEnd proposal={proposal} />}
      {!isStarted && <CountToStart proposal={proposal} />}
    </>
  )
}

export default ManageStateTime
