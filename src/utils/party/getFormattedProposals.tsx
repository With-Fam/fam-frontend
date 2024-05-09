const getFormattedProposals = (proposals: any[], decodedLogs: any[]) =>
  proposals.map((proposal, index) => {
    const proposalId = index + 1
    console.log('SWEETS proposalId ', proposalId)

    const matchingLog = decodedLogs.find(
      (log) => log.args.proposalId === BigInt(proposalId)
    )
    console.log('SWEETS matchingLog ', matchingLog)

    if (matchingLog) {
      return {
        ...proposal,
        decodedData: matchingLog,
      }
    }
    return proposal
  })

export default getFormattedProposals
