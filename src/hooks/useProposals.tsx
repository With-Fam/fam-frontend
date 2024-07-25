import getSortedUniqueProposals from '@/lib/getSortedUniqueProposals'
import { useSearchParams } from 'next/navigation'
import {} from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const useProposals = (party: any) => {
  const [proposals, setProposals] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [nextOffset, setNextOffset] = useState(0)
  const searchParams = useSearchParams()
  const pageNum = searchParams.get('pageNum') as any

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
        const proposalsWithPageNum = data?.proposals?.map((proposal: any) => ({
          ...proposal,
          pageNum: offset / 20,
        }))
        setProposals((prev: any) => {
          const newProposals = [...prev, ...proposalsWithPageNum]
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
    if (pageNum) {
      getProposals(parseInt(pageNum, 10) * 20)
      return
    }
    getProposals(nextOffset)
  }, [pageNum])

  return {
    proposals,
    getProposals,
    loading,
    nextOffset,
  }
}

export default useProposals
