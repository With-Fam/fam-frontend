// Framework
import dynamic from 'next/dynamic'

// Local Components
import { BidComponent, RecentDrops } from '@/components/community'
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
  AuctionFragment,
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

  const { tokens } = await SDK.connect(chainId).tokens({
    where: {
      dao: collection.toLowerCase(),
      tokenId: auctions[0].token.tokenId,
    },
  })

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
  const { page, token, metaData } = await getCommunityData(chainId, communityId)

  if (!page && token && metaData) {
    return <></>
  }

  return (
    <>
      <BidComponent token={token} page={page} metaData={metaData} />
      <FoundersComponent token={token} />
      <RecentDrops />
    </>
  )
}
