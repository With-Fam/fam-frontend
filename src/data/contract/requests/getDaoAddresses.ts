import { AddressType, CHAIN_ID, Maybe } from '@/types'
import { zeroAddress } from 'viem'

type DAOAddressesResult = {
  token: AddressType
  auction?: AddressType
  governor?: AddressType
  metadata?: AddressType
  treasury?: AddressType
}

const getDaoAddresses = async (
  chainId: CHAIN_ID,
  tokenAddress: AddressType
): Promise<Maybe<DAOAddressesResult>> => {
  return {
    token: tokenAddress,
    auction: zeroAddress,
    governor: zeroAddress,
    metadata: zeroAddress,
    treasury: zeroAddress,
  }
}

export default getDaoAddresses
