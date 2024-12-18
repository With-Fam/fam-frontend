import { Address, WalletClient, parseEventLogs } from 'viem'
import { CHAIN_ID } from '@/constants/defaultChains'
import { HYPERSUB_FACTORY, PUSH_SPLIT_FACTORY } from '@/constants/addresses'
import { getDeployHypersubCallData } from './getDeployHypersubCallData'
import { getPublicClient } from '@/lib/viem'
import { hypersubFactoryAbi } from '../abi/hypersubFactoryAbi'
import { createSplits } from '../split/createSplits'
import { executeMulticall } from '../multicall/executeMulticall'
import { getUpdateFeeRecipientCallData } from './getUpdateFeeRecipientCallData'

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
    const {
      hostsSplitCalldata,
      partyAndHostsSplitCalldata,
      partyAndHostsSplitAddress,
    } = await createSplits({ founderAddresses, partyAddress, ownerAddress })

    const hypersubCalldata = getDeployHypersubCallData(
      partyAndHostsSplitAddress
    )
    const deploymentCalls = [
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

    const deployHash = await executeMulticall({
      calls: deploymentCalls,
      walletClient,
    })

    const deployReceipt = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    })
    const hypersubLogs = parseEventLogs({
      logs: deployReceipt.logs,
      abi: hypersubFactoryAbi,
      eventName: 'Deployment',
    })

    const hypersubAddress = hypersubLogs[0]?.args?.deployment as Address
    if (!hypersubAddress) {
      throw new Error('Failed to get hypersub address')
    }

    console.log('hypersubAddress', hypersubAddress)

    const updateFeeRecipientCalldata = getUpdateFeeRecipientCallData({
      feeRecipient: partyAndHostsSplitAddress,
    })

    const updateHash = await executeMulticall({
      calls: [
        {
          target: hypersubAddress,
          allowFailure: false,
          callData: updateFeeRecipientCalldata,
        },
      ],
      walletClient,
    })

    await publicClient.waitForTransactionReceipt({ hash: updateHash })

    return { hypersubAddress }
  } catch (error) {
    console.error('error', error)
    return { error }
  }
}
