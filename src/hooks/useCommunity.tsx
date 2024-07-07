import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/lib/viem'
import { useEffect, useState } from 'react'
import erc721Abi from '@/lib/abi/erc721Abi.json'
import getContributedEvent from '@/lib/party/getContributedEvent'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { Address } from 'viem'

const useCommunity = (community: any): any => {
  const [data, setData] = useState(null)
  const [name, setName] = useState('')
  const { connectedWallet } = useConnectedWallet()

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(CHAIN_ID)
      let contributedEvent = await getContributedEvent(
        connectedWallet as Address,
        community.crowdfund,
        community.blockNumber,
        CHAIN_ID
      )
      let response = await publicClient.readContract({
        address: community.party,
        functionName: 'contractURI',
        abi: erc721Abi,
      })

      const result = await fetch(response as string)
      const data = await result.json()
      setData({
        ...data,
        contributedEvent,
      })

      response = await publicClient.readContract({
        address: community.party,
        functionName: 'name',
        abi: erc721Abi,
      })

      setName(response as string)
    }

    if (!community || !connectedWallet) return
    init()
  }, [community, connectedWallet])

  return {
    data,
    name,
  }
}

export default useCommunity
