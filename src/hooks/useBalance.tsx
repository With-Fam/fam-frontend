import useConnectedWallet from '@/hooks/useConnectedWallet'
import balanceOf from '@/utils/balanceOf'
import { useEffect, useState } from 'react'
import { Address, formatEther } from 'viem'

const useBalance = (community: any) => {
  const [balance, setBalance] = useState(0)
  const { connectedWallet } = useConnectedWallet()

  useEffect(() => {
    const init = async () => {
      const data = await balanceOf(community, connectedWallet as Address)
      setBalance(parseFloat(Number(formatEther(data)).toFixed(2)))
    }
    if (!connectedWallet || !community) return
    init()
  }, [community, connectedWallet])

  return {
    balance,
  }
}

export default useBalance
