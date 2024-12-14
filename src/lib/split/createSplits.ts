import { Address } from 'viem'
import { getEqualSplitParams } from './getEqualSplitParams'
import { getDeterministicAddress } from './getDeterministicAddress'
import { getCreateSplitCallData } from './getCreateSplitCallData'
import { PUSH_SPLIT_FACTORY } from '@/constants/addresses'
import { CHAIN_ID } from '@/constants/defaultChains'

export interface SplitCreationResult {
  hostsSplitCalldata: `0x${string}`
  partyAndHostsSplitCalldata: `0x${string}`
  partyAndHostsSplitAddress: Address
}

export const createSplits = async ({
  founderAddresses,
  partyAddress,
  ownerAddress,
}: {
  founderAddresses: readonly Address[]
  partyAddress: Address
  ownerAddress: Address
}): Promise<SplitCreationResult> => {
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

  // Create calldata for both splits
  const hostsSplitCalldata = getCreateSplitCallData({
    splitParams: hostsSplitParams,
    creator: ownerAddress,
  })

  const partyAndHostsSplitCalldata = getCreateSplitCallData({
    splitParams: partyAndHostsSplitParams,
    creator: ownerAddress,
  })

  return {
    hostsSplitCalldata,
    partyAndHostsSplitCalldata,
    partyAndHostsSplitAddress,
  }
}
