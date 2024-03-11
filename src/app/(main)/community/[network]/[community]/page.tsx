// Framework
import _get from 'lodash.get'

// Local Components
import { BidComponent, TabList } from '@/components/community'
import { TOGGLE_DATA } from '@/content/community'
import PreAuction from '@/components/community/BidComponent/PreAuction'

// Types
type CommunityProfileProps = {
  params: { community: string; network: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Actions
import { getCommunityData } from '@/app/(main)/community/[network]/[community]/actions'
import { getChainId } from '@/utils/getChainId'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  const { community, network } = _props.params
  const collection = community.toLowerCase()
  const chainId = getChainId(network.toUpperCase().replace('-', '_'))
  const { page, token, metaData, ...rest } = await getCommunityData(
    chainId,
    collection
  )

  if (!metaData) return <h1>Community not found</h1>
  if (!page && !token) return <PreAuction chainId={chainId} />

  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <BidComponent
        chainId={chainId}
        token={token}
        page={page}
        metaData={metaData}
        communityId={community}
      />
    </>
  )
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
