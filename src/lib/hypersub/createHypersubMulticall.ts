import { Address, multicall3Abi, WalletClient, parseEventLogs } from 'viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import {
  HYPERSUB_FACTORY,
  MULTICALL,
  PUSH_SPLIT_FACTORY,
} from '@/constants/addresses'
import { getDeployHypersubCallData } from './getDeployHypersubCallData'
import { getPublicClient } from '@/lib/viem'
import { getEqualSplitParams } from '../split/getEqualSplitParams'
import { getCreateSplitCallData } from '../split/getCreateSplitCallData'
import { getDeterministicAddress } from '../split/getDeterministicAddress'
import { hypersubFactoryAbi } from '../abi/hypersubFactoryAbi'

export interface CreateHypersubMulticallResult {
  hypersubAddress?: Address
  error?: unknown
}

export const createHypersubMulticall = async ({
  founderAddresses,
  ownerAddress,
  partyAddress,
  walletClient,
}: {
  founderAddresses: readonly Address[]
  ownerAddress: Address
  partyAddress: Address
  walletClient: WalletClient
}): Promise<CreateHypersubMulticallResult> => {
  try {
    if (!walletClient.account) {
      throw new Error('Wallet client account is required')
    }
    const publicClient = getPublicClient(CHAIN_ID)

    // Create equal split for hosts
    const hostsSplitParams = getEqualSplitParams(founderAddresses)
    const hostsSplitAddress = await getDeterministicAddress({
      splitParams: hostsSplitParams,
    })

    // Create 50/50 split between party and hosts split
    const partyAndHostsSplitParams = getEqualSplitParams([
      partyAddress,
      hostsSplitAddress,
    ])
    const partyAndHostsSplitAddress = await getDeterministicAddress({
      splitParams: partyAndHostsSplitParams,
    })

    // Create calldata for both splits and hypersub
    const hostsSplitCalldata = getCreateSplitCallData({
      splitParams: hostsSplitParams,
      creator: ownerAddress,
    })

    const partyAndHostsSplitCalldata = getCreateSplitCallData({
      splitParams: partyAndHostsSplitParams,
      creator: ownerAddress,
    })

    const hypersubCalldata = getDeployHypersubCallData()

    const calls = [
      {
        target: PUSH_SPLIT_FACTORY[CHAIN_ID],
        allowFailure: false,
        callData: hostsSplitCalldata,
      },
      {
        target: PUSH_SPLIT_FACTORY[CHAIN_ID],
        allowFailure: false,
        callData: partyAndHostsSplitCalldata,
      },
      {
        target: HYPERSUB_FACTORY[CHAIN_ID],
        allowFailure: false,
        callData: hypersubCalldata,
      },
    ]

    const hash = await walletClient.writeContract({
      address: MULTICALL,
      abi: multicall3Abi,
      functionName: 'aggregate3',
      args: [calls],
      chain: CHAIN,
      account: walletClient.account,
    })

    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    const hypersubLogs = parseEventLogs({
      logs: receipt.logs,
      abi: hypersubFactoryAbi,
      eventName: 'Deployment',
    })

    return { hypersubAddress: hypersubLogs[0]?.args?.deployment as Address }
  } catch (error) {
    console.error('error', error)
    return { error }
  }
}
