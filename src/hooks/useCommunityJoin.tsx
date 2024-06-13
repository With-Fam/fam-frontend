import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/utils/viem'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Address, erc721Abi } from 'viem'
import { crowdfundFactoryAbi } from '@/data/contract/abis/CrowdfundFactory'
import toast from 'react-hot-toast'

const useCommunityJoin = () => {
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
      const publicClient = getPublicClient(CHAIN_ID)
      const events = crowdfundFactoryAbi.filter(
        (item) => item.name === 'InitialETHCrowdfundCreated'
      )

      const logs = await publicClient.getLogs({
        event: events[0] as any,
        args: {
          creator: connectedWallet as Address,
          party: community as Address,
        },
        fromBlock: BigInt(0),
        toBlock: 'latest',
      })

      const event = logs[0] as any
      const crowFundContract = event?.args?.crowdfund
      if (!crowFundContract) {
        setLoading(false)
        return false
      }

      const price = await publicClient.readContract({
        abi: crowdfundFactoryAbi,
        functionName: 'minContribution',
        address: crowFundContract,
      })

      const contractConfig = {
        account: walletClient.account,
        abi: crowdfundFactoryAbi,
        functionName: 'contribute',
        address: crowFundContract,
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
    const response = await publicClient.readContract({
      address: community as Address,
      functionName: 'balanceOf',
      abi: erc721Abi,
      args: [connectedWallet as Address],
    })

    if (response > 0) {
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

export default useCommunityJoin
