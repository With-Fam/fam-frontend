const getFormattedProposals = (decodedLogs: any[], results: any[]) =>
  decodedLogs.map((proposal, index) => {
    const proposalId = index + 1
    const matchingLog = decodedLogs.find(
      (log) =>
        log.args.proposalId === BigInt(proposalId) &&
        results[index].result[0] !== 6
    )
    if (matchingLog) {
      return {
        ...proposal,
        decodedData: matchingLog,
      }
    }
    return undefined
  })

export default getFormattedProposals
