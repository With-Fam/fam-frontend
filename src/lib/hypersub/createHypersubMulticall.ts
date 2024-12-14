import { Address, WalletClient, parseEventLogs } from 'viem'
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
import { getPublicClient } from '@/lib/viem'

export interface HypersubMulticallResult {
  hypersubAddress?: Address
  hostSplitAddress?: Address
  error?: unknown
}

export const createHypersubMulticall = async ({
  founderAddresses,
  ownerAddress,
  walletClient,
}: {
  founderAddresses: Address[]
  ownerAddress: Address
  walletClient: WalletClient
}): Promise<HypersubMulticallResult> => {
  try {
    const publicClient = getPublicClient(CHAIN_ID)

    const hostSplitParams = getEqualSplitParams(founderAddresses)
    const hostSplitCallData = getCreateSplitCallData({
      splitParams: hostSplitParams,
      owner: ownerAddress,
      creator: ownerAddress,
    })

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

    return {
      hostSplitAddress: splitLogs[0]?.args?.split as Address | undefined,
      hypersubAddress: hypersubLogs[0]?.args?.deployment as Address | undefined,
    }
  } catch (error) {
    console.error('error', error)
    return { error }
  }
}
