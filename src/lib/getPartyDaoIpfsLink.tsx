const getPartyDaoIpfsLink = (hash: string): string => {
  if (!hash) return ''
  return hash?.indexOf?.('ipfs://') > -1
    ? hash.replace('ipfs://', `https://partydao.mypinata.cloud/ipfs/`)
    : hash
}

export default getPartyDaoIpfsLink
