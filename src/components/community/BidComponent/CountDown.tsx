'use client'

// Framework
import { useState, useEffect } from 'react'

// Local Components
import { Paragraph } from '@/stories'

// Types
import {
  AuctionFragment,
} from '@/data/subgraph/sdk.generated'
import { Duration } from '@/typings'
type CountDownProps = {
  page: AuctionFragment
}

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

const CountDown = ({ page }: CountDownProps): JSX.Element => {
  const [ended, setEnded] = useState(false)
  const [time, setTime] = useState<Duration>(zeroTime)

  useEffect(() => {
    const initialTime = getTimeDifference(page.endTime)
    setTime(initialTime)
  }, [page.endTime])

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
    ${String(time.days).padStart(2, '0')}d
    ${String(time.hours).padStart(2, '0')}h
    ${String(time.minutes).padStart(2, '0')}m
    ${String(time.seconds).padStart(2, '0')}s
  `

  return <Paragraph as="p2">{ended ? 'Ended' : formattedTime}</Paragraph>
}

export default CountDown
