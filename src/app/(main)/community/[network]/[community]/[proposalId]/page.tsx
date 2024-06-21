'use client'

import { Icon } from '@/components/Icon'
import ExecuteButton from '@/components/Pages/CommunityPage/ProposalPage/ExecuteButton'
import ProposalComments from '@/components/Pages/CommunityPage/ProposalPage/ProposalComments'
import ProposalInfo from '@/components/Pages/CommunityPage/ProposalPage/ProposalInfo'
import VetoButton from '@/components/Pages/CommunityPage/ProposalPage/VetoButton'
import VoteButton from '@/components/Pages/CommunityPage/ProposalPage/VoteButton'
import ProposalStatus from '@/components/Pages/CommunityPage/ProposalStatus'
import { UserAvatar } from '@/components/shared'
import EnsAddress from '@/components/shared/EnsAddress'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import useProposalDetail from '@/hooks/useProposalDetail'
import useProposalTimer from '@/hooks/useProposalTimer'
import getProposalStatus from '@/lib/getProposalStatus'
import { usePrivy } from '@privy-io/react-auth'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Address } from 'viem'

export default function CommunityProposal(): JSX.Element {
  const { ready, authenticated } = usePrivy()
  const { connectedWallet } = useConnectedWallet()
  const isAuthenticated = ready && authenticated && connectedWallet
  const { proposalId } = useParams()
  const searchParams = useSearchParams()
  const blockNumber = searchParams.get('blockNumber')
  const { community, network } = useParams()
  const { proposalDetail, getProposalDetail } = useProposalDetail(
    community,
    proposalId,
    blockNumber
  )
  const status = getProposalStatus(proposalDetail)
  const { push } = useRouter()
  const { countdown, isActiveVoting } = useProposalTimer(proposalDetail)

  return (
    <main className="relative mx-auto mt-8 max-w-[936px] px-2 pb-4">
      {proposalDetail ? (
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
          <ProposalStatus status={status} />
          <div className="mt-8 flex justify-between">
            <p className="text-[24px] text-green">
              {proposalDetail.votes.length}{' '}
              <span className="text-[20px]">votes</span>
            </p>
            <div className="flex items-center justify-center rounded-full bg-grey px-4 py-1 text-grey-light">
              {countdown}
            </div>
          </div>
          {proposalDetail.proposalState === PROPOSAL_STATUS.Ready &&
            proposalDetail.proposerAddress !== connectedWallet &&
            isAuthenticated && (
              <VetoButton
                community={community}
                proposalId={proposalDetail.proposalId}
                callback={getProposalDetail}
              />
            )}
          <div className="mt-8 flex items-center text-orange">
            <p className="text-[16px]">Action</p>{' '}
            <Icon id="arrowTopRight" fill="#f54d18" />
          </div>
          <div className="flex items-center justify-between">
            <ProposalInfo proposal={proposalDetail} />
            {(proposalDetail.proposalState === PROPOSAL_STATUS.Ready ||
              proposalDetail.proposalState === PROPOSAL_STATUS.Passed) &&
              isAuthenticated && (
                <>
                  {isActiveVoting ? (
                    <VoteButton
                      proposal={proposalDetail}
                      community={community as Address}
                      callback={getProposalDetail}
                    />
                  ) : (
                    <ExecuteButton
                      proposal={proposalDetail}
                      community={community as Address}
                      callback={getProposalDetail}
                    />
                  )}
                </>
              )}
          </div>
          {isAuthenticated && <ProposalComments proposal={proposalDetail} />}
        </>
      ) : (
        <>Loading...</>
      )}
    </main>
  )
}
