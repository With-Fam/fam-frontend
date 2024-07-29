const getEnsPfpLink = (ensName: string) => {
  if (!ensName) return ''
  return `https://metadata.ens.domains/mainnet/avatar/${ensName}`
}

export default getEnsPfpLink
