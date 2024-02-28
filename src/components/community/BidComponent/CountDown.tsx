'use client'

// Framework
import { useState, useEffect } from 'react'

// Local Components
import { Paragraph } from '@/stories'

// Types
import { ExploreDaoFragment } from '@/data/subgraph/sdk.generated'
import { TimeProps } from '@/types'
type CountDownProps = ExploreDaoFragment['endTime']

// Utils
import { getTimeDifference, decrementTimeByOneSecond } from '@/utils/helpers'
const zeroTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CountDown = ({ endTime }: CountDownProps): JSX.Element => {
  const [ended, setEnded] = useState(false)
  const [time, setTime] = useState<TimeProps>(zeroTime)

  useEffect(() => {
    const initialTime = getTimeDifference(endTime)
    setTime(initialTime.time)
  }, [endTime])

  useEffect(() => {
    if (!ended) {
      const countdownInterval = setInterval(() => {
        const { ended, ...updatedTime } = decrementTimeByOneSecond(time)
        if (ended) {
          clearInterval(countdownInterval)
          setEnded(true)
          return zeroTime
        }

        setTime(updatedTime)
      }, 1000)

      return () => {
        clearInterval(countdownInterval)
      }
    }
  }, [time, ended])

  const formattedTime = `
    ${time.days ? `${String(time.days).padStart(2, '0')}d` : ''}
    ${String(time.hours).padStart(2, '0')}h
    ${String(time.minutes).padStart(2, '0')}m
    ${String(time.seconds).padStart(2, '0')}s
  `

  return <Paragraph as="p2">{ended ? 'Ended' : formattedTime}</Paragraph>
}

export default CountDown
