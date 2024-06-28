import getContributedPartyEvents from '@/lib/party/getContributedPartyEvents'
import getCreatedPartyEvents from '@/lib/party/getCreatedPartyEvents'
import { ChainId } from '@/types/chain'
import { useCallback, useEffect, useState } from 'react'
import { Address } from 'viem'

const useJoinedParties = (chainId: number, address: Address) => {
  const [parties, setParties] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [displayParties, setDisplayParties] = useState<any>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const createdParties = await getCreatedPartyEvents(
        address,
        chainId as ChainId
      )
      const contributedParties = await getContributedPartyEvents(
        address,
        chainId as ChainId
      )
      const joinedParties = [
        ...new Set([...createdParties, ...contributedParties]),
      ]

      setParties(joinedParties)

      setLoading(false)
    }
    if (!chainId || !address) return
    init()
  }, [chainId, address])

  const loadMore = () => {
    if (!parties.length) return
    const displays = parties.slice(0, offset + 6)
    if (displays.length === parties.length) setHasNextPage(false)
    setOffset(offset + 6)
    setDisplayParties(displays)
  }

  useEffect(() => {
    loadMore()
  }, [parties])

  return {
    parties: displayParties,
    loading,
    loadMore,
    hasNextPage,
  }
}

export default useJoinedParties
