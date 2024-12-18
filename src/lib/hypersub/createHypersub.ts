import { Address, WalletClient, parseEventLogs } from 'viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { HYPERSUB_FACTORY } from '@/constants/addresses'
import { getPublicClient } from '@/lib/viem'
import { hypersubFactoryAbi } from '../abi/hypersubFactoryAbi'
import { getDeployArgs, getDeployArgsArray } from '@/lib/hypersub/getDeployArgs'

export interface CreateHypersubResult {
  hypersubAddress?: Address
  error?: unknown
}

export const createHypersub = async ({
  ownerAddress,
  walletClient,
}: {
  ownerAddress: Address
  walletClient: WalletClient
}): Promise<CreateHypersubResult> => {
  try {
    const publicClient = getPublicClient(CHAIN_ID)
    const deployArgs = getDeployArgs()

    const hash = await walletClient.writeContract({
      address: HYPERSUB_FACTORY[CHAIN_ID],
      abi: hypersubFactoryAbi,
      functionName: 'deploySubscription',
      args: getDeployArgsArray(deployArgs),
      chain: CHAIN,
      account: ownerAddress,
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
