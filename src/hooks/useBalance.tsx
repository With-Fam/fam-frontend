import { CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { getPublicClient } from '@/utils/viem'
import { useEffect, useState } from 'react'
import { Address, formatEther } from 'viem'

const useBalance = () => {
  const [balance, setBalance] = useState(0)
  const { connectedWallet } = useConnectedWallet()

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(CHAIN_ID)
      const data = await publicClient.getBalance({
        address: connectedWallet as Address,
      })

      setBalance(parseFloat(Number(formatEther(data)).toFixed(2)))
    }
    if (!connectedWallet) return
    init()
  }, [])

  return {
    balance,
  }
}

export default useBalance
