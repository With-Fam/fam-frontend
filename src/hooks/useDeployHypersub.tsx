'use client'

import { useState } from 'react'
import { Address, parseEventLogs } from 'viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/lib/viem'
import toast from 'react-hot-toast'
import handleTxError from '@/lib/handleTxError'
import { hypersubFactoryAbi } from '@/lib/abi/hypersubFactoryAbi'
import { HYPERSUB_FACTORY } from '@/constants/addresses'
import { getDeployArgs, getDeployArgsArray } from '@/lib/hypersub/getDeployArgs'

const useDeployHypersub = () => {
  const { walletClient } = usePrivyWalletClient(CHAIN)
  const [hypersubAddress, setHypersubAddress] = useState<Address>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const deployHypersub = async () => {
    if (!walletClient) return

    setIsLoading(true)
    try {
      await walletClient.switchChain({ id: CHAIN_ID })
      const publicClient = getPublicClient(CHAIN_ID)

      // Get deployment arguments
      const deployArgs = getDeployArgs()
      const args = getDeployArgsArray(deployArgs)

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

      // Parse the deployment event logs
      const deploymentLogs = parseEventLogs({
        logs: receipt.logs,
        eventName: 'Deployment',
        abi: hypersubFactoryAbi,
      })

      // Find the Deployment event
      const deployEvent = deploymentLogs.find(
        (log) => log.eventName === 'Deployment'
      )

      if (deployEvent) {
        const deployedAddress = deployEvent.args.deployment as Address
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
