import { Address } from 'viem'

export interface SplitParams {
  recipients: readonly Address[]
  allocations: readonly bigint[]
  totalAllocation: bigint
  distributionIncentive: number
}

export const getEqualSplitParams = (
  addresses: readonly Address[]
): SplitParams => {
  const allocation = BigInt(1e6 / addresses.length)
  return {
    recipients: addresses,
    allocations: addresses.map(() => allocation),
    totalAllocation: BigInt(1e6),
    distributionIncentive: 0,
  }
}
