import { Address, zeroAddress } from 'viem'
import { CHAIN_ID } from '@/constants/defaultChains'
import { PUSH_SPLIT_FACTORY } from '@/constants/addresses'
import { pushSplitFactoryAbi } from '@/lib/abi/PushSplitFactoryAbi'
import { SplitParams } from './getEqualSplitParams'
import { getPublicClient } from '@/lib/viem'

export const getDeterministicAddress = async ({
  splitParams,
}: {
  splitParams: SplitParams
}): Promise<Address> => {
  const { recipients, allocations, totalAllocation, distributionIncentive } =
    splitParams
  return getPublicClient(CHAIN_ID).readContract({
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
      zeroAddress,
    ],
  })
}
