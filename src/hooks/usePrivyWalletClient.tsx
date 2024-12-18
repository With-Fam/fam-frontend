import { useEffect, useState } from 'react'
import { WalletClient, createWalletClient, custom, Chain } from 'viem'
import useConnectedWallet from './useConnectedWallet'
import { CHAIN } from '@/constants/defaultChains'

const usePrivyWalletClient = (chain: Chain = CHAIN) => {
  const { connectedWallet, wallet } = useConnectedWallet()
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null)

  useEffect(() => {
    const init = async () => {
      if (!wallet) return
      const provider = await wallet.getEthereumProvider()
      const response = createWalletClient({
        chain,
        account: connectedWallet as `0x${string}`,
        transport: custom(provider),
      })

      setWalletClient(response)
    }

    if (!connectedWallet || !chain) return
    init()
  }, [connectedWallet, chain])

  return { walletClient }
}

export default usePrivyWalletClient
