import { useCallback, useEffect, useState } from 'react'

const useProposals = (party: any) => {
  const [proposals, setProposals] = useState<any>([])
  const [nextOffset, setNextOffset] = useState(0)
  const [loading, setLoading] = useState(false)

  const getProposals = useCallback(async () => {
    if (!party) return
    setLoading(true)
    const response = await fetch(
      `/api/proposals?party=${party}&nextOffset=${nextOffset}`
    )
    const data = await response.json()
    if (data?.proposals) {
      setProposals((prev: any) => [...prev, ...data?.proposals])
    }
    if (!data.nextProposalOffset) {
      setNextOffset(-1)
      return
    }
    setNextOffset(data.nextProposalOffset)
    setLoading(false)
  }, [party])

  useEffect(() => {
    getProposals()
  }, [getProposals])

  return {
    proposals,
    getProposals,
    loading,
    nextOffset,
  }
}

export default useProposals
