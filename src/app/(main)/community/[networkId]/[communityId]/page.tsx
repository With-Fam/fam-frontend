// Framework
import dynamic from 'next/dynamic'
import _get from 'lodash.get'

// Local Components
import {
  BidComponent,
  // RecentDrops,
  TabList,
} from '@/components/community'

import { TOGGLE_DATA } from '@/content/community'

const FoundersComponent = dynamic(
  () => import('@/components/community/FoundersComponent'),
  {
    ssr: false,
  }
)

// Types
type CommunityProfileProps = {
  params: { communityId: string; networkSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

import {
  // AuctionFragment,
  DaoFragment,
  TokenFragment,
} from '@/data/subgraph/sdk.generated'

// API
import { SDK } from '@/data/subgraph/client'

async function getCommunityData(chainId: number, collection: string) {
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

  console.log('-------OUTPUT DATA-------')
  console.log('dao::', dao)
  console.log('auctions::', auctions)
  console.log('tokens::', tokens)
  console.log('-------END OUTPUT-------')

  return {
    metaData: dao as DaoFragment,
    page: auctions[0] as any,
    token: tokens[0] as TokenFragment,
  }
}

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  console.log('_props::', _props)

  const chainId = 5 // Hardcoded. Should be passed in from the router
  const { communityId } = _props.params
  const { page, token, metaData } = await getCommunityData(
    chainId,
    communityId.toLowerCase()
  )

  console.log('communityId::', communityId)
  console.log('page::', page)
  console.log('token::', token)

  if (!page && token && metaData) {
    return <></>
  }

  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <BidComponent token={token} page={page} metaData={metaData} />
    </>
  )
}
