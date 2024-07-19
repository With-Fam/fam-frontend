import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/lib/viem'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Address } from 'viem'
import toast from 'react-hot-toast'
import getCrowdfundPrice from '@/lib/party/getCrowdfundPrice'
import getCrowdfundContract from '@/lib/party/getCrowdfundContract'
import balanceOf from '@/lib/balanceOf'
import { initialETHCrowdfundAbi } from '@/data/contract/abis/InitialETHCrowdfund'

const useContributeParty = () => {
  const { community } = useParams()
  const [joined, setJoined] = useState(false)
  const { walletClient } = usePrivyWalletClient()
  const { connectedWallet } = useConnectedWallet()
  const publicClient = getPublicClient(CHAIN_ID)
  const [loading, setLoading] = useState(true)

  const contribute = async () => {
    if (!walletClient || !connectedWallet) return

    setLoading(true)
    try {
      await walletClient.switchChain({ id: CHAIN_ID })

      const crowdfundContract = await getCrowdfundContract(community as Address)

      if (!crowdfundContract) {
        setLoading(false)
        return false
      }

      const price = await getCrowdfundPrice(crowdfundContract)

      const contractConfig = {
        account: walletClient.account,
        abi: initialETHCrowdfundAbi,
        functionName: 'contribute',
        address: crowdfundContract,
        chain: CHAIN,
        args: [connectedWallet, '0x'],
        value: price,
      }
      const { request } = await publicClient.simulateContract(
        contractConfig as any
      )
      const txHash = await walletClient.writeContract(request as any)
      let transaction
      if (txHash) {
        transaction = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })
      }
      setLoading(false)
      toast.success('joined!')
      setJoined(true)
      return transaction
    } catch (error) {
      setLoading(false)
      return { error }
    }
  }

  const checkJoining = useCallback(async () => {
    if (!community || !connectedWallet) return
    setLoading(true)
    const balance = await balanceOf(
      community as Address,
      connectedWallet as Address
    )

    if (balance > 0) {
      setJoined(true)
      setLoading(false)
      return
    }
    setJoined(false)
    setLoading(false)
  }, [community, connectedWallet])

  useEffect(() => {
    checkJoining()
  }, [checkJoining])

  return {
    joined,
    contribute,
    checkJoining,
    loading,
  }
}

export default useContributeParty
