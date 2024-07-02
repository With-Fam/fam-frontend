import { isAddress } from 'viem'

const getCollectionInfoFromZoraLink = (zoralink: string) => {
  if (isAddress(zoralink)) {
    return {
      collectionAddress: zoralink,
      tokenId: 1n,
    }
  }

  const addressPattern = /(?:base|bsep):0x[a-fA-F0-9]{40}\/(\d+)/
  const match = zoralink.match(addressPattern)

  if (match) {
    const collectionAddress = match[0].split(':')[1].split('/')[0]
    const tokenId = match[1]
    return { collectionAddress, tokenId: BigInt(tokenId) }
  }

  return {
    collectionAddress: zoralink,
    tokenId: 1n,
  }
}

export default getCollectionInfoFromZoraLink
