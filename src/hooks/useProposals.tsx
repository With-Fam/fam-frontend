import getSortedUniqueProposals from '@/lib/getSortedUniqueProposals'
import { useCallback, useEffect, useState } from 'react'

const useProposals = (party: any) => {
  const [proposals, setProposals] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const getProposals = useCallback(async () => {
    if (!party) return
    setLoading(true)
    let allProposals = [] as any
    let nextOffset = 0
    while (1) {
      const response = await fetch(
        `/api/proposals?party=${party}&nextOffset=${nextOffset}`
      )
      const data = await response.json()
      if (data?.proposals)
        allProposals = allProposals.concat(...data?.proposals)
      if (!data.nextProposalOffset) break

      nextOffset = data.nextProposalOffset
    }
    setProposals(getSortedUniqueProposals(allProposals))
    setLoading(false)
  }, [party])

  useEffect(() => {
    getProposals()
  }, [getProposals])

  return {
    proposals,
    getProposals,
    loading,
  }
}

export default useProposals
