<<<<<<< HEAD
/*--------------------------------------------------------------------*/

/**
 * Function
 */
const formatDate = (inputDate: string): string => {
=======
function formatDate(inputDate: string): string {
>>>>>>> origin/main
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
<<<<<<< HEAD

  return new Date(inputDate).toLocaleDateString('en-US', options)
}

export default formatDate

=======
  return new Date(inputDate).toLocaleDateString(undefined, options)
}

export default formatDate
>>>>>>> origin/main
