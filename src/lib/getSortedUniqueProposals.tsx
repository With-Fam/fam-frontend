const getSortedUniqueProposals = (proposals: any) => {
  const uniqueProposalsMap = new Map()
  proposals.forEach((proposal: any) => {
    const numericId = parseInt(proposal.proposalId)
    if (!uniqueProposalsMap.has(numericId)) {
      uniqueProposalsMap.set(numericId, { ...proposal, proposalId: numericId })
    }
  })
  const uniqueProposals = Array.from(uniqueProposalsMap.values())
  uniqueProposals.sort(
    (a, b) => parseInt(b.proposalId) - parseInt(a.proposalId)
  )

  return uniqueProposals
}

export default getSortedUniqueProposals
