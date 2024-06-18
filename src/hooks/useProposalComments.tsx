import { useCallback, useEffect, useState } from 'react'

const useProposalComments = (party: any, proposalId: any) => {
  const [proposalComments, setProposalComments] = useState<any>([])

  const getProposalComments = useCallback(async () => {
    if (!party || !proposalId) return
    const response = await fetch(
      `/api/proposals/comments?party=${party}&proposalId=${proposalId}`
    )
    const data = await response.json()
    setProposalComments(data.comment)
  }, [party, proposalId])

  useEffect(() => {
    getProposalComments()
  }, [getProposalComments])

  return {
    proposalComments,
  }
}

export default useProposalComments
