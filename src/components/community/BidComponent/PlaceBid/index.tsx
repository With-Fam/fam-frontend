'use client'

import { TokenFragment } from '@/data/subgraph/sdk.generated'
type PlaceBidProps = {
  token: TokenFragment
  chainId: number
  highestBid?: bigint
  communityId: string
  auctionAddress: string
}

const PlaceBid = ({
  token,
  chainId,
  highestBid,
  // communityId,
  auctionAddress,
}: PlaceBidProps): JSX.Element => {
  return <></>
}

export default PlaceBid
