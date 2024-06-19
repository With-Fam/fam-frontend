'use client'

import { Icon } from '@/components/Icon'
import ExecuteButton from '@/components/community/CommuntiyProposal/ExecuteButton'
import ProposalComments from '@/components/community/CommuntiyProposal/ProposalComments'
import ProposalInfo from '@/components/community/CommuntiyProposal/ProposalInfo'
import VetoButton from '@/components/community/CommuntiyProposal/VetoButton'
import ProposalStatus from '@/components/community/ProposalStatus'
import { UserAvatar } from '@/components/shared'
import EnsAddress from '@/components/shared/EnsAddress'
import { useProposalProvider } from '@/contexts/ProposalProvider'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import useProposalTimer from '@/hooks/useProposalTimer'
import getProposalStatus from '@/utils/getProposalStatus'
import { usePrivy } from '@privy-io/react-auth'
import { useParams, useRouter } from 'next/navigation'
import { Address } from 'viem'

export default function CommunityProposal(): JSX.Element {
  const { ready, authenticated } = usePrivy()
  const { connectedWallet } = useConnectedWallet()
  const isAuthenticated = ready && authenticated && connectedWallet
  const { proposals } = useProposalProvider() as any
  const { proposalId } = useParams()
  const filteredProposals = proposals.filter(
    (item: any) => item.proposalId === parseInt(proposalId as string)
  )
  const proposal = filteredProposals?.length > 0 ? filteredProposals[0] : null
  const status = getProposalStatus(proposal)
  const { push } = useRouter()
  const { community, network } = useParams()
  const { countdown } = useProposalTimer(proposal)

  return (
    <main className="relative mx-auto mt-8 max-w-[936px] px-2 pb-4">
      {proposal ? (
        <>
          <button
            className="my-3 flex items-center gap-2 font-abcMedium text-grey"
            onClick={() => push(`/community/${network}/${community}`)}
          >
            <Icon id="arrowLeft" fill="#a7a7a7" /> Back
          </button>
          <div className="flex justify-between font-abc text-grey">
            <div className="flex items-center gap-2">
              <UserAvatar
                address={proposal.proposerAddress}
                width={28}
                height={28}
              />
              by <EnsAddress address={proposal.proposerAddress} />
            </div>
            {new Date(proposal.createdTimestamp * 1000).toDateString()}
          </div>
          <p className="mb-2 mt-4 font-abcMedium text-[24px]">
            {proposal.name}
          </p>
          <ProposalStatus status={status} />
          <div className="mt-8 flex justify-between">
            <p className="text-[24px] text-green">
              {proposal.votes.length} <span className="text-[20px]">votes</span>
            </p>
            <div className="flex items-center justify-center rounded-full bg-grey px-4 py-1 text-grey-light">
              {countdown}
            </div>
          </div>
          {proposal.proposalState === PROPOSAL_STATUS.Ready &&
            isAuthenticated && (
              <VetoButton
                community={community}
                proposalId={proposal.proposalId}
              />
            )}
          <div className="mt-8 flex items-center text-orange">
            <p className="text-[16px]">Action</p>{' '}
            <Icon id="arrowTopRight" fill="#f54d18" />
          </div>
          <div className="flex items-center justify-between">
            <ProposalInfo proposal={proposal} />
            {proposal.proposalState === PROPOSAL_STATUS.Ready &&
              isAuthenticated && (
                <ExecuteButton
                  proposal={proposal}
                  community={community as Address}
                />
              )}
          </div>
          {isAuthenticated && <ProposalComments proposal={proposal} />}
        </>
      ) : (
        <>Loading...</>
      )}
    </main>
  )
}