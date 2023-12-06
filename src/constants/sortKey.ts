import { Auction_OrderBy } from '@/data/subgraph/sdk.generated'

export const SORT_KEY = {
  [Auction_OrderBy.StartTime]: 'Created',
  [Auction_OrderBy.HighestBidAmount]: 'Price',
  [Auction_OrderBy.EndTime]: 'Ending',
}
