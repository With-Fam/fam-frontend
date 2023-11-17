'use client'

// Framework
import { useState, useEffect } from 'react'

// Local Components
import { Paragraph } from '@/stories'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CountDown = (): JSX.Element => {
  const initialTime = { hours: 22, minutes: 13, seconds: 14 }
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (time.seconds > 0) {
        setTime((prevTime) => ({
          ...prevTime,
          seconds: prevTime.seconds - 1,
        }))
      } else if (time.minutes > 0) {
        setTime((prevTime) => ({
          ...prevTime,
          minutes: prevTime.minutes - 1,
          seconds: 59,
        }))
      } else if (time.hours > 0) {
        setTime((prevTime) => ({
          ...prevTime,
          hours: prevTime.hours - 1,
          minutes: 59,
          seconds: 59,
        }))
      } else {
        clearInterval(countdownInterval)
      }
    }, 1000)

    return () => {
      clearInterval(countdownInterval)
    }
  }, [time])

  const formattedTime = `${String(time.hours).padStart(2, '0')}h
  ${String(time.minutes).padStart(2, '0')}m ${String(time.seconds).padStart(
    2,
    '0'
  )}s`

  return <Paragraph as="p2">{formattedTime}</Paragraph>
}

export default CountDown
