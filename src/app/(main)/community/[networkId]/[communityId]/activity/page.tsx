// Framework
import type { Metadata } from 'next'

// Third Parties
import { SDK } from '@/data/subgraph/client'

// Local Components
import { CommunityActivity } from '@/components/community'

// Types
import type { ProposalFragment } from '@/data/subgraph/sdk.generated'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Community Profile',
  description: 'to do',
}

async function getActivityData(chainId: number, collection: string) {
  const { proposals } = await SDK.connect(chainId).proposals({
    first: 5,
    where: {
      dao: collection.toLowerCase(),
    },
  })
  return proposals
}

export default async function CommunityProfile(_props: any) {
  const chainId = 5 // Hardcoded. Should be passed in from the router
  const { communityId } = _props.params
  const proposals: ProposalFragment[] = await getActivityData(
    chainId,
    communityId
  )
  // Dont forget when there is none proposals
  return <CommunityActivity proposals={proposals} />
}
