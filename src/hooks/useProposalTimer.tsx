import getDiffFormattedDuration from '@/utils/getDiffFormattedDuration'
import { useEffect, useState } from 'react'

const useProposalTimer = (proposal: any) => {
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    if (!proposal) return
    const timer = setInterval(() => {
      if (Date.now() >= proposal.maxExecutableTime * 1000) {
        clearInterval(timer)
        setCountdown('Finished')
        return
      }
      const diff = getDiffFormattedDuration(
        Date.now(),
        new Date(proposal.maxExecutableTime * 1000)
      )
      setCountdown(diff)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [proposal])

  return {
    countdown,
  }
}

export default useProposalTimer
