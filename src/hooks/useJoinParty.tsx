import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/utils/viem'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Address } from 'viem'
import toast from 'react-hot-toast'
import getCrowdfundPrice from '@/utils/party/getCrowdfundPrice'
import getCrowdfundContract from '@/utils/party/getCrowdfundContract'
import balanceOf from '@/utils/balanceOf'
import { initialETHCrowdfundAbi } from '@/data/contract/abis/InitialETHCrowdfund'

const useJoinParty = () => {
  const { community } = useParams()
  const [joined, setJoined] = useState(false)
  const { walletClient } = usePrivyWalletClient()
  const { connectedWallet } = useConnectedWallet()
  const publicClient = getPublicClient(CHAIN_ID)
  const [loading, setLoading] = useState(false)

  const join = async () => {
    if (!walletClient || !connectedWallet) return

    setLoading(true)
    try {
      const crowdfundContract = await getCrowdfundContract(
        connectedWallet as Address,
        community as Address
      )

      if (!crowdfundContract) {
        setLoading(false)
        console.log('SWEETS')
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
    const balance = await balanceOf(
      community as Address,
      connectedWallet as Address
    )

    if (balance > 0) {
      setJoined(true)
      return
    }
    setJoined(false)
  }, [community, connectedWallet])

  useEffect(() => {
    checkJoining()
  }, [checkJoining])

  return {
    joined,
    join,
    checkJoining,
    loading,
  }
}

export default useJoinParty
