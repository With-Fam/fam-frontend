'use client'

import { Icon } from '@/components/Icon'
import { LongArrow } from '@/components/icons'
import ProposalAction from '@/components/Pages/CommunityPage/ProposalPage/ProposalAction'
import ProposalComments from '@/components/Pages/CommunityPage/ProposalPage/ProposalComments'
import ProposalInfo from '@/components/Pages/CommunityPage/ProposalPage/ProposalInfo'
import ProposalStatus from '@/components/Pages/CommunityPage/ProposalStatus'
import { Loading, UserAvatar } from '@/components/shared'
import EnsAddress from '@/components/shared/EnsAddress'
import { useProposalProvider } from '@/contexts/ProposalProvider'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import useProposalVoteTimer from '@/hooks/useProposalVoteTimer'
import useVotingStatus from '@/hooks/useVotingStatus'
import getProposalStatus from '@/lib/getProposalStatus'
import { usePrivy } from '@privy-io/react-auth'
import { useParams, useRouter } from 'next/navigation'

export default function CommunityProposal(): JSX.Element {
  const { proposalId } = useParams()
  const { community, network } = useParams()
  const { proposals, proposalsLoading, getProposals } =
    useProposalProvider() as any
  const proposalDetail = proposals?.filter(
    (proposal: any) =>
      proposal.proposalId === parseInt(proposalId as string, 10)
  )?.[0]

  const status = getProposalStatus(proposalDetail)
  const { push } = useRouter()
  const { voteCountdown } = useProposalVoteTimer(proposalDetail)
  const { isActiveVoting } = useVotingStatus(proposalDetail)
  const { ready, authenticated } = usePrivy()
  const { connectedWallet } = useConnectedWallet()
  const isAuthenticated = ready && authenticated && connectedWallet
  const isDefeated = status === PROPOSAL_STATUS.Defeated

  return (
    <main className="relative mx-auto mt-8 max-w-[936px] px-2 pb-4">
      {proposalsLoading || !proposalDetail ? (
        <Loading />
      ) : (
        <>
          <button
            className="mb-8 flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full bg-grey-light"
            onClick={() => push(`/community/${network}/${community}`)}
          >
            <LongArrow />
          </button>
          <div className="flex justify-between font-abc text-grey">
            <div className="flex items-center gap-2">
              <UserAvatar
                address={proposalDetail.proposerAddress}
                width={28}
                height={28}
              />
              by <EnsAddress address={proposalDetail.proposerAddress} />
            </div>
            {new Date(proposalDetail.createdTimestamp * 1000).toDateString()}
          </div>
          <p className="mb-2 mt-4 font-abcMedium text-[24px]">
            {proposalDetail.name}
          </p>
          <div className="flex items-center gap-2">
            <ProposalStatus status={status} />
            {isActiveVoting && isAuthenticated && (
              <div className="flex items-center justify-center rounded-full bg-orange-light px-2 py-1 text-[14px] text-orange">
                {voteCountdown}
              </div>
            )}
          </div>
          {!isDefeated && (
            <ProposalAction
              proposal={proposalDetail}
              getProposalDetail={getProposals}
            />
          )}
          <div className="mt-8 flex items-center text-orange">
            <p className="text-[16px]">Action</p>{' '}
            <Icon id="arrowTopRight" fill="#f54d18" />
          </div>
          <ProposalInfo proposal={proposalDetail} />
          {isAuthenticated && <ProposalComments proposal={proposalDetail} />}
        </>
      )}
    </main>
  )
}
