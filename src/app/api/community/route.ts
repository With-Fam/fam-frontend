// Framework
import { NextRequest, NextResponse } from 'next/server'

// Third Parties
import _get from 'lodash.get'
import { SDK } from '@/data/subgraph/client'

// Types
import { DaoFragment, TokenFragment } from '@/data/subgraph/sdk.generated'

// ---------------------- GET ROUTE ---------------------- //
export async function GET(request: NextRequest): Promise<
  NextResponse<
    | {
        metaData: DaoFragment
        page: any
        token: TokenFragment
      }
    | { error: string }
  >
> {
  const chainId = request.nextUrl.searchParams.get('chainId') as string
  const collection = request.nextUrl.searchParams.get('collection') as string

  if (!chainId || !collection) {
    return NextResponse.json(
      { error: 'chainId or collection invalid' },
      { status: 500 }
    )
  }

  const { dao } = await SDK.connect(Number(chainId)).daoOGMetadata({
    tokenAddress: collection.toLowerCase(),
  })

  const { auctions } = await SDK.connect(Number(chainId)).myDaosPage({
    daos: [collection.toLowerCase()],
  })

  const { tokens } = await SDK.connect(Number(chainId)).tokens({
    where: {
      dao: collection.toLowerCase(),
      tokenId: _get(auctions, '0.token.tokenId'),
    },
  })

  return NextResponse.json(
    {
      metaData: dao as DaoFragment,
      page: auctions[0] as any,
      token: tokens[0] as TokenFragment,
    },
    { status: 200 }
  )
}
