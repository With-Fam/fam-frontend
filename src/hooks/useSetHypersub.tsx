'use client'

import { useState } from 'react'
import { Address, parseEventLogs } from 'viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/lib/viem'
import toast from 'react-hot-toast'
import handleTxError from '@/lib/handleTxError'
import { manageFamAuthorityAbi } from '@/lib/abi/manageFamAuthorityAbi'
import { MANAGE_FAM_AUTHORITY } from '@/constants/addresses'

const useSetHypersub = (partyAddress?: Address) => {
  const { walletClient } = usePrivyWalletClient(CHAIN)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isHypersubSet, setIsHypersubSet] = useState<boolean>(false)

  const checkHypersubSet = async () => {
    if (!partyAddress || !walletClient) return false

    try {
      const publicClient = getPublicClient(CHAIN_ID)
      const hypersubAddress = await publicClient.readContract({
        address: MANAGE_FAM_AUTHORITY[CHAIN_ID],
        abi: manageFamAuthorityAbi,
        functionName: 'partyToHypersub',
        args: [partyAddress],
      })

      const isSet =
        hypersubAddress !== '0x0000000000000000000000000000000000000000'
      setIsHypersubSet(isSet)
      return isSet
    } catch (error) {
      console.error('Error checking hypersub status:', error)
      return false
    }
  }

  const setHypersub = async (hypersubAddress: Address) => {
    if (!walletClient || !partyAddress) return

    setIsLoading(true)
    try {
      await walletClient.switchChain({ id: CHAIN_ID })
      const publicClient = getPublicClient(CHAIN_ID)

      const { request } = await publicClient.simulateContract({
        address: MANAGE_FAM_AUTHORITY[CHAIN_ID],
        abi: manageFamAuthorityAbi,
        functionName: 'setHypersub',
        account: walletClient.account?.address as Address,
        args: [partyAddress, hypersubAddress],
      })

      const hash = await walletClient.writeContract(request)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      const hypersubSetLogs = parseEventLogs({
        logs: receipt.logs,
        eventName: 'HypersubSet',
        abi: manageFamAuthorityAbi,
      })

      if (hypersubSetLogs.length > 0) {
        setIsHypersubSet(true)
        toast.success('Hypersub linked successfully!')
      }

      setIsLoading(false)
      return receipt
    } catch (error) {
      setIsLoading(false)
      handleTxError(error)
      return { error }
    }
  }

  return {
    setHypersub,
    isHypersubSet,
    checkHypersubSet,
    isLoading,
  }
}

export default useSetHypersub
