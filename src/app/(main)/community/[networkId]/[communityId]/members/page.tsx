// Local Components
import { CommunityMembers } from '@/components/community'

// Types
type CommunityProfileProps = {
  params: { communityId: string; networkSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// API
import { SDK } from '@/data/subgraph/client'

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
  const chainId = 5 // Hardcoded. Should be passed in from the router
  const { communityId } = _props.params
  const data: any = await getMemberData(chainId, communityId)
  return <CommunityMembers data={data as any} />
}
