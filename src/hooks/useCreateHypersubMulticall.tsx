import { Address, parseEventLogs } from 'viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import {
  HYPERSUB_FACTORY,
  MULTICALL,
  PUSH_SPLIT_FACTORY,
} from '@/constants/addresses'
import { multicall3Abi } from '@/lib/abi/multicall3Abi'
import { hypersubFactoryAbi } from '@/lib/abi/hypersubFactoryAbi'
import { pushSplitFactoryAbi } from '@/lib/abi/PushSplitFactoryAbi'
import { getCreateSplitCallData } from '@/lib/split/getCreateSplitCallData'
import { getEqualSplitParams } from '@/lib/split/getEqualSplitParams'
import { getDeployHypersubCallData } from '@/lib/hypersub/getDeployHypersubCallData'
import usePrivyWalletClient from './usePrivyWalletClient'
import { getPublicClient } from '@/lib/viem'

export interface HypersubMulticallResult {
  hypersubAddress?: Address
  hostSplitAddress?: Address
  error?: unknown
}

interface UseCreateHypersubMulticallParams {
  founderAddresses: Address[]
  ownerAddress: Address
}

export const useCreateHypersubMulticall = ({
  founderAddresses,
  ownerAddress,
}: UseCreateHypersubMulticallParams) => {
  const { walletClient } = usePrivyWalletClient()

  const createHypersubMulticall =
    async (): Promise<HypersubMulticallResult> => {
      if (!walletClient) return { error: 'Wallet client not found' }

      try {
        const publicClient = getPublicClient(CHAIN_ID)

        // Create host split
        const hostSplitParams = getEqualSplitParams(founderAddresses)
        const hostSplitCallData = getCreateSplitCallData({
          splitParams: hostSplitParams,
          owner: ownerAddress,
          creator: ownerAddress,
        })

        // Deploy hypersub
        const hypersubCallData = getDeployHypersubCallData()

        const calls = [
          {
            target: PUSH_SPLIT_FACTORY[CHAIN_ID],
            callData: hostSplitCallData,
            allowFailure: false,
          },
          {
            target: HYPERSUB_FACTORY[CHAIN_ID],
            callData: hypersubCallData,
            allowFailure: false,
          },
        ]

        const txHash = await walletClient.writeContract({
          address: MULTICALL,
          abi: multicall3Abi,
          functionName: 'aggregate3',
          args: [calls],
          chain: CHAIN,
          account: ownerAddress,
        })

        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })

        const splitLogs = parseEventLogs({
          logs: receipt.logs,
          abi: pushSplitFactoryAbi,
          eventName: 'SplitCreated',
        })

        const hypersubLogs = parseEventLogs({
          logs: receipt.logs,
          abi: hypersubFactoryAbi,
          eventName: 'Deployment',
        })

        const splitEvent = splitLogs[0]
        const hypersubEvent = hypersubLogs[0]

        return {
          hostSplitAddress: splitEvent?.args?.split as Address | undefined,
          hypersubAddress: hypersubEvent?.args?.deployment as
            | Address
            | undefined,
        }
      } catch (error) {
        console.error('error', error)
        return { error }
      }
    }

  return { createHypersubMulticall }
}
