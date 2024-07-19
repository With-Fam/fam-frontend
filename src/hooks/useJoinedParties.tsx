import getNFTs from '@/lib/alchemy/getNFTs'
import getJoinedTime from '@/lib/party/getJoinedTime'
import { useEffect, useState } from 'react'
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
      const nfts: any = await getNFTs(address, '', chainId)
      const parties = nfts.ownedNfts.filter(
        (nft: any) =>
          nft.tokenType === 'ERC721' && nft?.raw?.metadata?.party_card_url
      )

      const partyAddresses = parties.map((party: any) => party.contract.address)
      const partyJoinedTimes: any = await getJoinedTime(partyAddresses, address)

      const formattedParties: any = parties.map(
        (party: any, index: number) => ({
          blockNumber: party.mint.blockNumber,
          joinedAt: partyJoinedTimes[index],
          address: party.contract.address,
          name: party.contract.name,
          image: party.raw.metadata.image,
          tokenId: party.tokenId,
        })
      )

      const uniqueAddresses = new Set()
      const uniqueFormattedParties = formattedParties.filter((party: any) => {
        if (uniqueAddresses.has(party.address)) return false
        else {
          uniqueAddresses.add(party.address)
          return true
        }
      })

      const sortedParties = uniqueFormattedParties.sort(
        (a: any, b: any) => b.joinedAt - a.joinedAt
      )

      setParties(sortedParties)

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
