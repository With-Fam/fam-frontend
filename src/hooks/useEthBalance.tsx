import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/lib/viem'
import { useEffect, useState } from 'react'
import { Address, formatEther } from 'viem'

const useEthBalance = (address: Address) => {
  const [ethBalance, setEthBalance] = useState<any>(0)

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(CHAIN_ID)
      const balance = await publicClient.getBalance({
        address,
      })

      setEthBalance(formatEther(balance).toString())
    }
    if (!address) return
    init()
  }, [address])

  return {
    ethBalance,
  }
}

export default useEthBalance
