// Types
import type { Metadata } from 'next'
// import { SDK } from '@/data/subgraph/client'

// Local Components
import { CommunityActivity } from '@/components/community'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Community Profile',
  description: 'to do',
}

// async function getActivityData(chainId: number, collection: string) {
//   const dao = await SDK.connect(chainId).proposals()
//   return dao
// }

export default async function CommunityProfile(_props: any) {
  const chainId = 5 // Hardcoded. Should be passed in from the router
  const { communityId } = _props.params
  // const data: any = await getActivityData(chainId, communityId)
  return <CommunityActivity />
}
