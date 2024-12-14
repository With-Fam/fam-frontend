import { Address } from 'viem'
import { SplitParams } from './getCreateSplitCallData'

export const getEqualSplitParams = (recipients: Address[]): SplitParams => {
  const count = BigInt(recipients.length)
  const allocation = 1000000n / count

  return {
    recipients,
    allocations: recipients.map(() => allocation),
    totalAllocation: 1000000n,
    distributionIncentive: 0,
  }
}
