import { Address } from 'viem'

export interface ZoraCollectValues {
  collectionAddress?: Address
  party?: Address
  tokenId?: bigint
  ethPrice?: number
}
