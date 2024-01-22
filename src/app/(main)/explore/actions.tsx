// Third Parties
import { SDK } from '@/data/subgraph/client'
import {
  Auction_OrderBy,
  ExploreDaosPageQuery,
  OrderDirection,
} from '@/data/subgraph/sdk.generated'
import { sql } from '@vercel/postgres'

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
  try {
    const getQuery = sql`
        SELECT * FROM communities WHERE enabled = true AND network = 'goerli';
      `

    const result = await getQuery

    const daos: string[] = []
    result.rows.forEach((row) => {
      if (trending && row.featured) {
        daos.push(row.community_id)
      }

      if (!trending) {
        daos.push(row.community_id)
      }
    })

    const data = await SDK.connect(chainId).exploreDaosPage({
      orderBy: Auction_OrderBy.StartTime,
      orderDirection: OrderDirection.Desc,
      where: {
        dao_in: daos,
        settled: false,
      },
      skip: (pageInt - 1) * limit,
      first: limit,
    })

    return {
      communities: data.auctions,
      count: result.rowCount,
    }
  } catch (error) {
    console.log(error)

    return {
      communities: [],
      count: 0,
    }
  }
}
