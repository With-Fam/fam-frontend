'use client'

import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/lib/viem'
import { useEffect, useState } from 'react'
import erc721Abi from '@/lib/abi/erc721Abi.json'
import useConnectedWallet from '@/hooks/useConnectedWallet'

const useCommunity = (community: any): any => {
  const [data, setData] = useState(null)
  const [name, setName] = useState('')
  const { connectedWallet } = useConnectedWallet()

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(CHAIN_ID)

      let response = await publicClient.readContract({
        address: community,
        functionName: 'contractURI',
        abi: erc721Abi,
      })

      const result = await fetch(response as string)
      const data = await result.json()
      setData(data)

      response = await publicClient.readContract({
        address: community,
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
