function formatDate(inputDate: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(inputDate).toLocaleDateString(undefined, options)
}

export default formatDate
