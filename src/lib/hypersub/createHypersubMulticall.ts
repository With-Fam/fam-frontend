import { Address, WalletClient, parseEventLogs } from 'viem'
import { CHAIN_ID } from '@/constants/defaultChains'
import { HYPERSUB_FACTORY, PUSH_SPLIT_FACTORY } from '@/constants/addresses'
import { getDeployHypersubCallData } from './getDeployHypersubCallData'
import { getPublicClient } from '@/lib/viem'
import { hypersubFactoryAbi } from '../abi/hypersubFactoryAbi'
import { createSplits } from '../split/createSplits'
import { executeMulticall } from '../multicall/executeMulticall'

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
    const publicClient = getPublicClient(CHAIN_ID)

    // Create splits and get calldata
    const {
      hostsSplitCalldata,
      partyAndHostsSplitCalldata,
      partyAndHostsSplitAddress,
    } = await createSplits({ founderAddresses, partyAddress, ownerAddress })

    // Get hypersub calldata
    const hypersubCalldata = getDeployHypersubCallData()

    // Execute multicall
    const hash = await executeMulticall({
      calls: [
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
      ],
      walletClient,
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
