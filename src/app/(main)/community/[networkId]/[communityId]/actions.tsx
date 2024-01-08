// Framework
import _get from 'lodash.get'

// Types
import {
  AuctionBid,
  AuctionBidsQuery,
  DaoFragment,
  TokenFragment,
} from '@/data/subgraph/sdk.generated'
type CommunityDataResponse = {
  metaData: DaoFragment
  page: AuctionBidsQuery
  token: TokenFragment
  bids: AuctionBid[]
}

// API
import { SDK } from '@/data/subgraph/client'

/*--------------------------------------------------------------------*/

/**
 * Actions
 */

export async function getCommunityData(
  chainId: number,
  collection: string
): Promise<CommunityDataResponse> {
  const { dao } = await SDK.connect(chainId).daoOGMetadata({
    tokenAddress: collection.toLowerCase(),
  })

  const { auctions } = await SDK.connect(chainId).myDaosPage({
    daos: [collection.toLowerCase()],
  })

  console.log('AUCTIOKNS::', auctions)

  const { tokens } = await SDK.connect(chainId).tokens({
    where: {
      dao: collection.toLowerCase(),
      tokenId: _get(auctions, '0.token.tokenId'),
    },
  })

  const { auction } = await SDK.connect(chainId).auctionBids({
    id: `${dao?.tokenAddress}:1`,
  })

  console.log('-------OUTPUT DATA-------')
  console.log('dao::', dao)
  console.log('auctions::', auctions)
  console.log('tokens::', tokens)
  console.log('-------END OUTPUT-------')

  return {
    metaData: dao as DaoFragment,
    page: auctions[0] as AuctionBidsQuery,
    token: tokens[0] as TokenFragment,
    bids: auction?.bids as AuctionBid[],
  }
}
