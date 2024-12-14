import { Address } from 'viem'
import { getEqualSplitParams } from './getEqualSplitParams'
import { getDeterministicAddress } from './getDeterministicAddress'
import { getCreateSplitCallData } from './getCreateSplitCallData'

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
  const hostsSplitParams = getEqualSplitParams(founderAddresses)
  const hostsSplitAddress = await getDeterministicAddress({
    splitParams: hostsSplitParams,
  })
  const partyAndHostsSplitParams = getEqualSplitParams([
    partyAddress,
    hostsSplitAddress,
  ])
  const partyAndHostsSplitAddress = await getDeterministicAddress({
    splitParams: partyAndHostsSplitParams,
  })
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
