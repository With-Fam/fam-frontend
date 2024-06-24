import { isAddress } from 'viem'

const getAddressFromZoraLink = (zoralink: any) => {
  if (isAddress(zoralink)) {
    return zoralink
  }

  const addressPattern = /(?:base|bsep):0x[a-fA-F0-9]{40}/

  const match = zoralink.match(addressPattern)

  if (match) {
    const address = match[0].split(':')[1]
    return address
  }

  return zoralink
}

export default getAddressFromZoraLink
