import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/utils/viem'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import erc721Abi from '@/utils/abi/erc721Abi.json'

const useCommunity = (community: Address): any => {
  const [data, setData] = useState(null)
  const [name, setName] = useState('')

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

    init()
  }, [community])

  return {
    data,
    name,
  }
}

export default useCommunity
