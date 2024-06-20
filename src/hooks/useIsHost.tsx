import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import { getPublicClient } from '@/lib/viem'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const useIsHost = (community: any, address: Address) => {
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(CHAIN_ID)
      const data = await publicClient.readContract({
        address: community as Address,
        abi: partyAbi,
        functionName: 'isHost',
        args: [address as Address],
      })
      setIsHost(data)
    }
    if (!address || !community) return
    init()
  }, [address, community])

  return {
    isHost,
  }
}

export default useIsHost
