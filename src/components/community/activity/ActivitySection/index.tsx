'use client'

// Framework
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Third Parties
import { getAddress } from 'ethers'
import { useCheckAuth } from '@/hooks/useCheckAuth'

// Local Components
import { Paragraph } from '@/stories'
import ActivitySectionWidget from '@/components/community/activity/ActivitySection/ActivitySectionWidget'
import ActivitySectionComments from '@/components/community/activity/ActivitySection/ActivitySectionComments'
import ActivitySectionInfo from '@/components/community/activity/ActivitySection/ActivitySectionInfo'
import VoteButtonHandle from '@/components/community/activity/ActivitySection/VoteButtonHandle'
import ShowVoteManager from '@/components/community/activity/ActivitySection/ShowVoteManager'
import BackActivityButton from '@/components/community/activity/BackActivityButton'

// Types
import { AddressType } from '@/types'
import {
  ProposalFragment,
  ProposalQuery,
  ProposalVote,
} from '@/data/subgraph/sdk.generated'
type ActivitySectionProps = {
  chainId: number
  proposal: ProposalQuery['proposal'] | null
}

// Helpers
import { getProposalState } from '@/data/contract/requests/getProposalState'
import { useMockStoreContext } from '@/contexts/mock-store'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivitySection = ({
  proposal,
  chainId,
}: ActivitySectionProps): JSX.Element => {
  const { widgets } = useMockStoreContext()
  const { wagmiData, isAuthenticated } = useCheckAuth()
  const { address: userAddress } = wagmiData
  const [state, setState] = useState<number | null>(null)
  const proposalId = proposal && proposal.proposalId
  const governorAddress = proposal && proposal.dao.governorAddress

  useEffect(() => {
    if (governorAddress && proposalId) {
      getProposalState(chainId, governorAddress, proposalId).then((data) => {
        setState(data)
      })
    }
  }, [proposal, chainId, proposalId, governorAddress])

  if (!proposal) {
    return (
      <section className="p-4">
        <Paragraph as="p3">No action found</Paragraph>
      </section>
    )
  }

  const signerVote =
    userAddress && proposal
      ? proposal.votes?.find(
          (vote) => getAddress(vote.voter) === getAddress(userAddress)
        )
      : undefined
  const widget = widgets.find((widget) => widget.id === proposal.proposalId)

  return (
    <section className="mx-auto max-w-2xl p-5">
      <BackActivityButton />
      <div className="flex flex-col gap-6">
        <ActivitySectionInfo
          proposal={proposal as ProposalFragment}
          chainId={chainId}
          signerVote={signerVote as ProposalVote}
          state={state}
          proposalId={proposal.proposalId}
          governorAddress={proposal.dao.governorAddress as AddressType}
          userAddress={userAddress as AddressType}
        />
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
        {isAuthenticated && (
          <ShowVoteManager
            state={state}
            chainId={chainId}
            governorAddress={proposal.dao.governorAddress}
            userAddress={userAddress as AddressType}
            timeCreated={proposal.timeCreated}
            proposalId={proposal.proposalId}
            signerVote={signerVote as ProposalVote}
            className="block w-full sm:hidden"
            href={{
              pathname: null,
              query: { voting: true, title: proposal.title },
            }}
          />
        )}
        <ActivitySectionComments proposal={proposal} />
        <VoteButtonHandle chainId={chainId} />
      </div>
    </section>
  )
}

export default ActivitySection
