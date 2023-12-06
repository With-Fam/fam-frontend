import isEqual from 'lodash/isEqual'
import { isAddress } from 'viem'

import { Duration } from '@/types'

/**
 *
 * camelToTitle
 * @param camel: string
 * @returns string
 */

export const camelToTitle = (camel: string): string => {
  if (!camel) return ''

  const result = camel.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

/*

  covert time { days, hours, minutes, seconds } to seconds

*/
export const toSeconds = ({
  days,
  hours,
  minutes,
  seconds,
}: Duration): number => {
  let secs = 0

  if (!!days) {
    secs = secs + Number(days) * 24 * 60 * 60
  }

  if (!!hours) {
    secs = secs + Number(hours) * 60 * 60
  }

  if (!!minutes) {
    secs = secs + Number(minutes) * 60
  }

  if (!!seconds) {
    secs = secs + Number(seconds)
  }

  return secs
}

/*

  covert seconds to { days, hours, minutes }

*/
export const fromSeconds = (value: bigint | number | undefined): Duration => {
  if (!value) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const _seconds = Number(value)
  let minutes = _seconds / 60
  let hours = minutes / 60
  let days = hours / 24
  let seconds = 0

  if (days >= 1) {
    const daysMod = days % 1
    days = days - daysMod

    if (daysMod > 0) {
      hours = daysMod * 24
      const hoursMod = hours % 1
      if (hoursMod > 0) {
        hours = hours - hoursMod
        minutes = Math.round(hoursMod * 60)
      } else if (hoursMod === 0) {
        return { days, hours, minutes: 0, seconds: 0 }
      }
    } else if (daysMod === 0) {
      return { days, hours: 0, minutes: 0, seconds: 0 }
    }
  } else if (hours >= 1) {
    const hoursMod = hours % 1
    if (hoursMod > 0) {
      days = 0
      hours = hours - hoursMod
      minutes = Math.round(hoursMod * 60)
    } else if (hoursMod === 0) {
      return { days: 0, hours, minutes: 0, seconds: 0 }
    }
  } else {
    const minutesMod = minutes % 1
    seconds = Math.round(minutesMod * 60)
    minutes = minutes - minutesMod

    hours = hours >= 1 ? hours : 0
    days = days >= 1 ? days : 0
  }
  return { days, hours, minutes, seconds }
}

/**
 * Determines whether an object is empty or not.
 *
 * @param object
 * @returns {boolean}
 */
export const isEmpty = (object: Record<string, unknown>): boolean => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) return false
  }
  return true
}

/**
 * Flattens Nested Object
 *
 * @params object
 * @returns object
 */

export const flatten = (object: object): Record<string, unknown> | void => {
  if (typeof object !== 'object') return

  return Object.assign(
    {},
    ...(function _flatten(o: any = {}): any {
      if (!isEmpty(o)) {
        return [].concat(
          ...Object?.keys(o).map((k) =>
            typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] }
          )
        )
      }
    })(object)
  )
}

/**
 * Create snippet of wallet address or
 * return address if it is not a "address"
 * as defined by Ethers.
 *
 * @param addr
 * @param chars
 * @returns {string || null}
 */

export const walletSnippet = (
  addr: string | number | undefined,
  chars: number = 5
): string => {
  if (!addr) {
    return ''
  }
  const _addr = addr.toString()

  return isAddress(_addr)
    ? _addr.substring(0, chars) +
        '...' +
        _addr.substring(_addr.length - chars, _addr.length)
    : _addr
}

/**
 * Pass a normal function in to have it return a promise with its valud
 *
 * @param fn: function
 * @returns any
 */

export const resolvedPromise = (fn: () => void): Promise<any> =>
  new Promise((resolve) => resolve(fn))

/**
 * compare two nearly identical objects and return an array of changes values
 *
 * @param initialValues: object
 * @param values: object
 *
 * @returns []
 * */

export const compareAndReturn = (
  initialValues: Record<string, unknown>,
  values: Record<string, unknown>
): any => {
  const updates = Object.entries(initialValues).reduce(
    (acc: Record<string, unknown>[] = [], cv: any) => {
      const _field = cv[0]
      const _value = cv[1]
      const _values: any[] = Object.entries(values)
      const value = _values.filter((item) => item[0] === _field)[0][1]

      if (!isEqual(_value, value)) {
        if (typeof value !== 'object') {
          if (_value.toString() !== value.toString()) {
            acc.push({
              field: _field,
              value: value,
            })
          }
        } else {
          const initValueObject: any[] = Object.entries(_value)
          const valueObject: any[] = Object.entries(value)
          initValueObject.reduce((_acc: any[] = [], _cv: any[]) => {
            console.log('_acc::', _acc)
            const _f = _cv[0]
            const _v = _cv[1].toString()
            const v = valueObject
              .filter((item) => item[0] === _f)[0]?.[1]
              .toString()

            if (!isEqual(_v, v)) {
              acc.push({
                field: _field,
                value: value,
              })
            }
          }, [])
        }
      }

      return acc
    },
    []
  )

  return updates.filter(
    (object, index) =>
      index ===
      updates.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(object))
  )
}

/*

  Get Date x years from today

*/
export const formatDate = (
  date: Date | string,
  readable: boolean = false
): string => {
  if (typeof date === 'string') {
    const [year, month, day] = date.split('-')
    return readable ? `${month}/${day}/${year}` : `${year}-${month}-${day}`
  } else {
    let month = String(date.getMonth() + 1)
    let day = String(date.getDate())
    const year = String(date.getFullYear())

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return readable ? `${month}/${day}/${year}` : `${year}-${month}-${day}`
  }
}

export const yearsAhead = (years: number): string => {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()
  return formatDate(new Date(year + years, month, day), false)
}

export const handleGMTOffset = (): string => {
  const now = new Date()
  const timezoneOffset = now.getTimezoneOffset()
  const offsetHours = -timezoneOffset / 60

  return `GMT ${offsetHours >= 0 ? '+' : ''}${offsetHours}:00`
}

/**
 * Takes a possibly undefined array and returns either the array, or an array of undefined of
 * length expectedLength
 *
 * @param array possibly undefined array
 * @param expectedLength the expected length of the array if it were not undefined
 * @returns {T | undefined[]}
 */
export function unpackOptionalArray<T = []>(
  array: T | undefined,
  expectedLength: number
): T | undefined[] {
  if (!array) {
    return Array(expectedLength).fill(undefined)
  }
  return array
}

// Markdown is impossible to detect in all cases, but this should cover most of the cases we'll run into
export const isPossibleMarkdown = (text: string): boolean => {
  const markdownRegex =
    /(?:\*\*[^\*]+\*\*)|(?:__[^\_]+__)|(?:\*[^\*]+\*)|(?:_[^\_]+_)|(?:\#[^\#]+\#)|(?:\!\[[^\]]*\]\([^\)]+\))|(?:\[[^\]]+\]\([^\)]+\))/g
  return markdownRegex.test(text)
}
export function maxChar(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str
  }
  return str.slice(0, maxLength) + '...'
}
/**
 * Takes a string and returns the difference from now
 * If time is negative, returns zero
 *
 */
export function getTimeDifference(timestamp: string): Duration {
  const now = new Date()
  const targetDate = new Date(Number(timestamp) * 1000)
  const timeDifference = Number(targetDate) - Number(now)

  if (timeDifference < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return fromSeconds(timeDifference)
}

/**
 * Takes an onject with time like so { days, hours, minutes, seconds }
 * and returns the same object with one second less if it's above zero
 *
 */

export function decrementTimeByOneSecond(
  time: Duration & { ended?: boolean }
): Duration & { ended?: boolean } {
  const m = 60
  const h = m * 60
  const d = h * 24

  const remainingSeconds =
    (time.days || 0) * d +
    (time.hours || 0) * h +
    (time.minutes || 0) * m +
    (time.seconds || 0)

  const newTime = remainingSeconds - 1
  const { days, hours, minutes, seconds } = fromSeconds(newTime)
  const sumOfTime =
    Number(days) + Number(hours) + Number(minutes) + Number(seconds)

  if (sumOfTime <= 0) {
    return {
      ended: true,
    }
  }

  return { days, hours, minutes, seconds }
}

/**
 * Takes a ipfs image url and returns an image
 * available source from ipfs.io
 *
 */
export function convertIpfsUrl(ipfsUrl: string): string {
  const lastSlashIndex = ipfsUrl.lastIndexOf('/')
  const hash = ipfsUrl.substring(lastSlashIndex + 1)

  return `https://ipfs.io/ipfs/${hash}`
}

/**
 * Takes a date in a string returns a boolean
 * saying if the date is expired or not
 *
 */
export function isDateExpired(timestampString: string): boolean {
  const timestamp = parseInt(timestampString, 10)
  const currentTimestamp = Math.floor(Date.now() / 1000)
  return timestamp < currentTimestamp
}

/**
 * Takes a date in a string returns a date
 * in the following example format: July 23, 2023
 *
 */
export function formatUnixTimestampDate(timestampString: string): string {
  const timestamp = parseInt(timestampString, 10)
  const date = new Date(timestamp * 1000)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}
