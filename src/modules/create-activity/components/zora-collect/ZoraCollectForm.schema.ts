import { Address } from 'viem'

export interface ZoraCollectValues {
  collectionAddress?: Address
  tokenRecipient?: Address
  tokenId?: bigint
  ethPrice?: number
}
