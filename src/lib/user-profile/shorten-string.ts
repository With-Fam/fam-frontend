// Types
interface ShortenStringProps {
  longString: string
  prefixLength?: number
  suffixLength?: number
}

/*--------------------------------------------------------------------*/

/**
 * Function
 */

const shortenString = ({
  longString,
  prefixLength = 5,
  suffixLength = 3,
}: ShortenStringProps): string => {
  if (longString.length <= prefixLength + suffixLength) {
    return longString
  }

  const prefix = longString.substring(0, prefixLength)
  const suffix = longString.substring(longString.length - suffixLength)

  return `${prefix}...${suffix}`
}

export default shortenString
