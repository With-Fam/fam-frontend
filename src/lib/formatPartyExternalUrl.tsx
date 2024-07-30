const formatPartyExternalUrl = (externalUrl: any) => {
  if (!externalUrl) return '#'
  const isIncludedHttps = externalUrl.startsWith('http')
  if (isIncludedHttps) return externalUrl
  return `https://${externalUrl}`
}

export default formatPartyExternalUrl
