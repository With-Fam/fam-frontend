import { Address, encodeFunctionData } from 'viem'
import { pushSplitFactoryAbi } from '../abi/PushSplitFactoryAbi'

export interface SplitParams {
  recipients: Address[]
  allocations: bigint[]
  totalAllocation: bigint
  distributionIncentive: number
}

export interface CreateSplitParams {
  splitParams: SplitParams
  owner: Address
  creator: Address
}

export const getCreateSplitCallData = ({
  splitParams,
  owner,
  creator,
}: CreateSplitParams): `0x${string}` => {
  return encodeFunctionData({
    abi: pushSplitFactoryAbi,
    functionName: 'createSplit',
    args: [splitParams, owner, creator],
  })
}

export const getCreateSplitDeterministicCallData = ({
  splitParams,
  owner,
  creator,
  salt,
}: CreateSplitParams & { salt: `0x${string}` }): `0x${string}` => {
  return encodeFunctionData({
    abi: pushSplitFactoryAbi,
    functionName: 'createSplitDeterministic',
    args: [splitParams, owner, creator, salt],
  })
}
