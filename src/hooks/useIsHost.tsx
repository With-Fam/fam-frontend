import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { getPublicClient } from '@/utils/viem'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const useIsHost = (community: any) => {
  const { connectedWallet } = useConnectedWallet()
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(CHAIN_ID)
      const data = await publicClient.readContract({
        address: community as Address,
        abi: partyAbi,
        functionName: 'isHost',
        args: [connectedWallet as Address],
      })
      setIsHost(data)
    }
    if (!connectedWallet || !community) return
    init()
  }, [connectedWallet, community])

  return {
    isHost,
  }
}

export default useIsHost
