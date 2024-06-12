const getFormattedProposals = (decodedLogs: any[]) =>
  decodedLogs.map((proposal, index) => {
    const proposalId = index + 1
    const matchingLog = decodedLogs.find(
      (log) => log.args.proposalId === BigInt(proposalId)
    )
    if (matchingLog) {
      return {
        ...proposal,
        decodedData: matchingLog,
      }
    }
    return proposal
  })

export default getFormattedProposals
