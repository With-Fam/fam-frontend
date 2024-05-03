import { AddressType, CHAIN_ID } from '@/types'

export const getPropertyItemsCount = async (
  chainId: CHAIN_ID,
  metadataAddress: AddressType
) => {
  return {
    propertiesCount: 0,
    propertyItemsCount: [0n],
  }
}
