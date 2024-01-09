// Framework
import _get from 'lodash.get'

// Local Components
import { BidComponent, TabList } from '@/components/community'
import { TOGGLE_DATA } from '@/content/community'
import PreAuction from '@/components/community/BidComponent/PreAuction'

// Types
type CommunityProfileProps = {
  params: { communityId: string; networkSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Actions
import { getCommunityData } from '@/app/(main)/community/[networkId]/[communityId]/actions'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  const chainId = 5 // Hardcoded. Should be passed in from the router
  const { communityId } = _props.params
  const { page, token, metaData, bids } = await getCommunityData(
    chainId,
    communityId.toLowerCase()
  )

  console.log('communityId::', communityId)
  console.log('page::', page)
  console.log('token::', token)

  if (!page && !token) return <PreAuction />
  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <BidComponent
        chainId={chainId}
        token={token}
        page={page}
        metaData={metaData}
        bids={bids}
      />
    </>
  )
}
