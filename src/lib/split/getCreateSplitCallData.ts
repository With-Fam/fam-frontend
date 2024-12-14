import { Address, encodeFunctionData, zeroAddress } from 'viem'
import { pushSplitFactoryAbi } from '@/lib/abi/PushSplitFactoryAbi'
import { SplitParams } from './getEqualSplitParams'

export const getCreateSplitCallData = ({
  splitParams,
  creator,
}: {
  splitParams: SplitParams
  creator: Address
}) => {
  const owner = zeroAddress
  return encodeFunctionData({
    abi: pushSplitFactoryAbi,
    functionName: 'createSplit',
    args: [splitParams, owner, creator],
  })
}
