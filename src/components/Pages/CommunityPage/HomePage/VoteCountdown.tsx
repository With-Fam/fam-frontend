import useProposalVoteTimer from '@/hooks/useProposalVoteTimer'

const VoteCountdown = ({ proposal }: any) => {
  const { voteCountdown } = useProposalVoteTimer(proposal)

  return (
    <div className="rounded-full bg-orange-light px-3 py-1">
      <p className="text-[12px] text-orange">{voteCountdown}</p>
    </div>
  )
}

export default VoteCountdown
