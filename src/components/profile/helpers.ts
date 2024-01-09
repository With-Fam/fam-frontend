export function formatDateFromUnixTimestamp(unixTimestamp: number): string {
  const timestampInMilliseconds = unixTimestamp * 1000
  const date = new Date(timestampInMilliseconds)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  const formattedDate = `${month} ${day}, ${year}`

  return formattedDate
}
