'use client'

import { useState } from 'react'
import { Address, zeroAddress } from 'viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/lib/viem'
import toast from 'react-hot-toast'
import handleTxError from '@/lib/handleTxError'
import { hypersubFactoryAbi } from '@/lib/abi/hypersubFactoryAbi'
import { HYPERSUB_FACTORY } from '@/constants/addresses'

const useDeployHypersub = () => {
  const { walletClient } = usePrivyWalletClient(CHAIN)
  const [hypersubAddress, setHypersubAddress] = useState<Address>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const deployHypersub = async (partyAddress: Address) => {
    if (!walletClient) return

    setIsLoading(true)
    try {
      await walletClient.switchChain({ id: CHAIN_ID })
      const publicClient = getPublicClient(CHAIN_ID)

      // Prepare contract arguments for Hypersub deployment
      const name = 'FAM SUBSCRIPTION'
      const symbol = 'FAM'
      const contractUri = 'ipfs://'
      const tokenUri = 'ipfs://'
      const tokensPerSecond = 1
      const minimumPurchaseSeconds = 1
      const rewardBps = 500
      const erc20Address = zeroAddress
      const feeConfigId = 0
      const args = [
        name,
        symbol,
        contractUri,
        tokenUri,
        BigInt(tokensPerSecond),
        BigInt(minimumPurchaseSeconds),
        rewardBps,
        erc20Address,
        BigInt(feeConfigId),
      ] as const

      // Simulate the transaction first
      const { request } = await publicClient.simulateContract({
        address: HYPERSUB_FACTORY[CHAIN_ID],
        abi: hypersubFactoryAbi,
        functionName: 'deploySubscription',
        account: walletClient.account?.address as Address,
        args,
      })

      // Execute the transaction
      const hash = await walletClient.writeContract(request)

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({ hash })

      // Get the deployed Hypersub address from the transaction logs
      const deployEvent = receipt.logs.find(
        (log: any) =>
          log?.topics[0]?.toLowerCase() ===
          // You'll need to add the correct event topic hash for HypersubDeployed
          '0x...'
      )

      if (deployEvent) {
        const deployedAddress = deployEvent.address as Address
        setHypersubAddress(deployedAddress)
        toast.success('Hypersub deployed successfully!')
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
    deployHypersub,
    hypersubAddress,
    isLoading,
  }
}

export default useDeployHypersub
