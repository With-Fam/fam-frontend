import getDiffFormattedDuration from '@/lib/getDiffFormattedDuration'
import { useEffect, useState } from 'react'

const useProposalVoteTimer = (proposal: any) => {
  const [voteCountdown, setVoteCountdown] = useState('')

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
  }
}

export default useProposalVoteTimer
