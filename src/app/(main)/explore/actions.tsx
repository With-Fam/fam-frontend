// Third Parties
import { SDK } from '@/data/subgraph/client'
import fs from 'fs'
import {
  Auction_OrderBy,
  ExploreDaosPageQuery,
  OrderDirection,
} from '@/data/subgraph/sdk.generated'
// import { sql } from '@vercel/postgres'

// Types
type getExploreDataProps = {
  limit: number
  chainId: number
  page: string
  trending: boolean
}
type getExploreDataReturn = {
  communities: ExploreDaosPageQuery['auctions']
  count: number
}

/*--------------------------------------------------------------------*/

/**
 * Actions
 */

export async function getExploreData({
  limit,
  chainId,
  page,
  trending,
}: getExploreDataProps): Promise<getExploreDataReturn> {
  const pageInt = parseInt(page, 10) || 1
  const uniqueCommunities: ExploreDaosPageQuery['auctions'] = []
  try {
    const data = await SDK.connect(chainId).exploreDaosPage({
      orderBy: Auction_OrderBy.StartTime,
      orderDirection: OrderDirection.Desc,
      skip: (pageInt - 1) * limit,
      first: limit,
    })

    data.auctions.forEach((item) => {
      const hasCommunity = uniqueCommunities.find(
        (auction) => auction.dao.tokenAddress === item.dao.tokenAddress
      )

      if (!hasCommunity) {
        uniqueCommunities.push(item)
      }
    })

    return {
      communities: uniqueCommunities,
      count: 5,
    }
  } catch (error) {
    return {
      communities: [],
      count: 0,
    }
  }
}
