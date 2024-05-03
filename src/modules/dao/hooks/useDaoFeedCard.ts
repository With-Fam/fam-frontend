import { CHAIN_ID } from '@/types'

interface useDaoCardProps {
  collectionAddress: string
  auctionAddress: string
  chainId: CHAIN_ID
}

export const useDaoFeedCard = ({
  collectionAddress,
  auctionAddress,
  chainId,
}: useDaoCardProps) => {
  return {
    highestBid: undefined,
    tokenUri: '',
    endTime: 0,
    tokenId: 1,
  }
}
