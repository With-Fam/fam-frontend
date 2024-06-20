import useConnectedWallet from '@/hooks/useConnectedWallet'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import getDiffFormattedDuration from '@/utils/getDiffFormattedDuration'
import { useEffect, useState } from 'react'

const useProposalTimer = (proposal: any) => {
  const [countdown, setCountdown] = useState('')
  const [shouldBeVote, setShouldBeVote] = useState(false)
  const [voteCountdown, setVoteCountdown] = useState('')
  const { connectedWallet } = useConnectedWallet()

  useEffect(() => {
    if (!proposal || !connectedWallet) return
    const executeTimer = setInterval(() => {
      const currentTime = Date.now()
      const expectedTime = proposal.maxExecutableTime * 1000
      if (currentTime >= expectedTime) {
        clearInterval(executeTimer)
        setCountdown('Finished')
        return
      }
      const diff = getDiffFormattedDuration(currentTime, expectedTime)
      setCountdown(diff)
    }, 1000)

    const votes = proposal.votes
    const myVote = votes.filter((vote: any) => vote.address === connectedWallet)
    if (myVote.length || proposal.proposalState === PROPOSAL_STATUS.Ready) {
      setShouldBeVote(false)
      return
    }
    const voteTimer = setInterval(() => {
      const currentTime = Date.now()
      const expectedTime =
        (proposal.voteDuration + proposal.createdTimestamp) * 1000
      if (currentTime > expectedTime) {
        clearInterval(voteTimer)
        setVoteCountdown('Finished')
        setShouldBeVote(false)
        return
      }
      const diff = getDiffFormattedDuration(currentTime, expectedTime)
      setVoteCountdown(diff)
      setShouldBeVote(true)
    }, 1000)

    return () => {
      clearInterval(executeTimer)
      clearInterval(voteTimer)
    }
  }, [proposal, connectedWallet])

  return {
    countdown,
    shouldBeVote,
    voteCountdown,
  }
}

export default useProposalTimer
