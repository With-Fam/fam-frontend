// Local Components
import { CommunityMembers, TabList } from '@/components/community'
import { TOGGLE_DATA } from '@/content/community'

// Types
type CommunityProfileProps = {
  params: { communityId: string; networkId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// API
import { SDK } from '@/data/subgraph/client'
import { getChainId } from '@/utils/getChainId';

async function getMemberData(chainId: number, collection: string) {
  const dao = await SDK.connect(chainId).daoMembersList({
    where: {
      dao: collection.toLowerCase(),
    },
  })
  return dao
}

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  const { communityId, networkId } = _props.params
  const chainId = getChainId(networkId);
  const data: any = await getMemberData(chainId, communityId)
  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <CommunityMembers data={data as any} />
    </>
  )
}
