const getIpfsLink = (hash: string): string => {
  if (!hash) return ''
  return hash?.indexOf?.('ipfs://') > -1
    ? hash.replace('ipfs://', `https://cloudflare-ipfs.com/ipfs/`)
    : hash
}

export default getIpfsLink
