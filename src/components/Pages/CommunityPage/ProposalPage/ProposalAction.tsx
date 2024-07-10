import VoteButton from '@/components/Pages/CommunityPage/ProposalPage/VoteButton'
import VotesBar from '@/components/Pages/CommunityPage/ProposalPage/VotesBar'
import ExecuteButton from '@/components/Pages/CommunityPage/ProposalPage/ExecuteButton'
import useProposalVetoTimer from '@/hooks/useProposalVetoTimer'
import useVotingStatus from '@/hooks/useVotingStatus'
import useProposalState from '@/hooks/useProposalState'
import { useParams } from 'next/navigation'
import { Address } from 'viem'
import VetoButton from '@/components/Pages/CommunityPage/ProposalPage/VetoButton'

const ProposalAction = ({ proposal, getProposalDetail }: any) => {
  const { community } = useParams()
  const { vetoCountdown } = useProposalVetoTimer(proposal)
  const { isActiveVoting, displayedPercent, needToPassNum } =
    useVotingStatus(proposal)
  const { canApprove, canExecute, isCompleted, canVeto } = useProposalState(
    community,
    proposal
  )

  return (
    <>
      <div className="border-gray-light mt-4 rounded-[8px] border px-5 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[24px] text-green">
            {proposal.votes.length} <span className="text-[20px]">votes</span>
          </p>
          {canApprove && (
            <VoteButton
              proposal={proposal}
              community={community as Address}
              callback={getProposalDetail}
            />
          )}
          {canExecute && (
            <ExecuteButton
              proposal={proposal}
              community={community as Address}
              callback={getProposalDetail}
            />
          )}
          {!canExecute && !isCompleted && (
            <div className="flex items-center justify-center rounded-full bg-orange-light px-2 py-1 text-[14px] text-orange">
              {vetoCountdown}
            </div>
          )}
        </div>
        {!isCompleted && (
          <p className="mt-2 w-fit rounded-full text-grey">
            {isActiveVoting ? (
              <>{needToPassNum} votes needed to pass.</>
            ) : (
              'Waiting to be finalized.'
            )}
          </p>
        )}
        <VotesBar value={displayedPercent} />
      </div>
      {canVeto && (
        <VetoButton
          community={community}
          proposalId={proposal?.proposalId}
          callback={getProposalDetail}
        />
      )}
    </>
  )
}

export default ProposalAction
