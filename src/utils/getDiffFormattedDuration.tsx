import duration from 'dayjs/plugin/duration'
import dayjs from 'dayjs'

const getDiffFormattedDuration = (time1: any, time2: any) => {
  const date1 = dayjs(time1)
  const date2 = dayjs(time2)
  dayjs.extend(duration)

  const d = dayjs.duration(date2.diff(date1))
  const days = Math.abs(d.days())
  const hours = Math.abs(d.hours())
  const minutes = Math.abs(d.minutes())
  const seconds = Math.abs(d.seconds())

  const formattedDuration = `${days ? `${days}d ` : ''}${hours || days ? `${hours}h ` : ''}${minutes || hours ? `${minutes}m ` : ''}${seconds ? `${seconds}s` : ''} ago`

  return formattedDuration
}

export default getDiffFormattedDuration
