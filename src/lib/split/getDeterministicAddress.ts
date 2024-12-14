import { Address, PublicClient } from 'viem'
import { pushSplitFactoryAbi } from '../abi/PushSplitFactoryAbi'
import { PUSH_SPLIT_FACTORY } from '@/constants/addresses'
import { CHAIN_ID } from '@/constants/defaultChains'
import { SplitParams } from './getCreateSplitCallData'

export const getDeterministicAddress = async ({
  publicClient,
  splitParams,
  owner,
}: {
  publicClient: PublicClient
  splitParams: SplitParams
  owner: Address
}): Promise<Address> => {
  const { recipients, allocations, totalAllocation, distributionIncentive } =
    splitParams

  const address = await publicClient.readContract({
    address: PUSH_SPLIT_FACTORY[CHAIN_ID],
    abi: pushSplitFactoryAbi,
    functionName: 'predictDeterministicAddress',
    args: [
      {
        recipients,
        allocations,
        totalAllocation,
        distributionIncentive,
      },
      owner,
    ],
  })

  return address as Address
}
