import getSortedUniqueProposals from '@/lib/getSortedUniqueProposals'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Address } from 'viem'

const useProposals = (party: Address) => {
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

      try {
        const response = await fetch(
          `/api/proposals?party=${party}&nextOffset=${offset}`
        )
        const data = await response.json()

        const stackResponse = await fetch(`/api/stack/proposal/${party}`)
        const stackData = await stackResponse.json()
        console.log('stackData', stackData)

        if (data?.proposals) {
          const proposalsWithMetadata = data.proposals.map(
            (proposal: any, index: number) => ({
              ...proposal,
              pageNum: offset / 20,
              name: stackData[index].metadata.title,
            })
          )

          setProposals((prev: any) => {
            const newProposals = [...prev, ...proposalsWithMetadata]
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
      } catch (error) {
        console.error('Error fetching proposals:', error)
      } finally {
        setLoading(false)
      }
    },
    [party]
  )

  useEffect(() => {
    if (pageNum) {
      getProposals(parseInt(pageNum, 10) * 20)
      return
    }
    getProposals(nextOffset)
  }, [pageNum, getProposals, nextOffset])

  return {
    proposals,
    getProposals,
    loading,
    nextOffset,
  }
}

export default useProposals
