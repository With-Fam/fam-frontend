'use client'

// Types
import { Auction, TokenFragment } from '@/data/subgraph/sdk.generated'
type BidComponentProps = {
  token: TokenFragment
  page: Auction
  metaData: any
  // bids: AuctionBid[]
  chainId: number
  communityId: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidComponent = ({
  token,
  page,
  metaData,
  // bids,
  chainId,
  communityId,
}: BidComponentProps): JSX.Element => {
  return <section className="px-4">hello world</section>
}

export default BidComponent
