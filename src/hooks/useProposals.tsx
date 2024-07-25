import getSortedUniqueProposals from '@/lib/getSortedUniqueProposals'
import { useCallback, useEffect, useState } from 'react'

const useProposals = (party: any) => {
  const [proposals, setProposals] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [nextOffset, setNextOffset] = useState(0)

  const getProposals = useCallback(
    async (offset: number) => {
      if (!party) return
      if (offset === nextOffset && offset !== 0) return
      setLoading(true)
      const response = await fetch(
        `/api/proposals?party=${party}&nextOffset=${offset}`
      )
      const data = await response.json()
      if (data?.proposals) {
        setProposals((prev: any) => {
          const newProposals = [...prev, ...data?.proposals]
          const uniqueProposals = getSortedUniqueProposals(newProposals)
          return uniqueProposals
        })
      }
      if (!data.nextProposalOffset) {
        setNextOffset(-1)
        setLoading(false)
        return
      }
      setNextOffset(data.nextProposalOffset)
      setLoading(false)
    },
    [party]
  )

  useEffect(() => {
    getProposals(nextOffset)
  }, [getProposals])

  return {
    proposals,
    getProposals,
    loading,
    nextOffset,
  }
}

export default useProposals
