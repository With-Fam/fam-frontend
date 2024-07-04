import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import getDiffFormattedDuration from '@/lib/getDiffFormattedDuration'
import { useEffect, useState } from 'react'

const useProposalVoteTimer = (proposal: any) => {
  const proposalState = proposal?.proposalState

  const [voteCountdown, setVoteCountdown] = useState('')
  const isActiveVoting =
    proposalState === PROPOSAL_STATUS.Passed ||
    proposalState === PROPOSAL_STATUS.Voting

  useEffect(() => {
    if (!proposal) return

    const voteTimer = setInterval(() => {
      const currentTime = Date.now()
      const expectedTime =
        (proposal.voteDuration + proposal.createdTimestamp) * 1000
      if (currentTime > expectedTime) {
        clearInterval(voteTimer)
        setVoteCountdown('Finished')
        return
      }
      const diff = getDiffFormattedDuration(currentTime, expectedTime)
      setVoteCountdown(diff)
    }, 1000)

    return () => {
      clearInterval(voteTimer)
    }
  }, [proposal])

  return {
    voteCountdown,
    isActiveVoting,
  }
}

export default useProposalVoteTimer
