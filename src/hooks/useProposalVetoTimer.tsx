import getDiffFormattedDuration from '@/lib/getDiffFormattedDuration'
import { useEffect, useState } from 'react'

const useProposalVetoTimer = (proposal: any) => {
  const [vetoCountdown, setCountdown] = useState('')

  useEffect(() => {
    if (!proposal) return
    const executeTimer = setInterval(() => {
      const currentTime = Date.now()
      const expectedTime =
        (proposal.proposedTime + proposal.vetoDurationSeconds) * 1000
      if (currentTime >= expectedTime) {
        clearInterval(executeTimer)
        setCountdown('Finished')
        return
      }
      const diff = getDiffFormattedDuration(currentTime, expectedTime)
      setCountdown(diff)
    }, 1000)

    return () => {
      clearInterval(executeTimer)
    }
  }, [proposal])

  return {
    vetoCountdown,
  }
}

export default useProposalVetoTimer
