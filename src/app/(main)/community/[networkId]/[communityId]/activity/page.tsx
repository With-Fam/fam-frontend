// Framework
import type { Metadata } from 'next'

// Third Parties
import { SDK } from '@/data/subgraph/client'

// Local Components
import { CommunityActivity, TabList } from '@/components/community'
import { TOGGLE_DATA } from '@/content/community'

// Types
import type { ProposalFragment } from '@/data/subgraph/sdk.generated'
type CommunityProfileProps = {
  params: {
    networkId: string
    communityId: `0x${string}`
  }
}

// Actions
import { getCommunityData } from '@/app/(main)/community/[networkId]/[communityId]/actions'
import { getChainId } from '@/utils/getChainId'

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

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  const { communityId, networkId } = _props.params
  const chainId = getChainId(networkId);
  const proposals: ProposalFragment[] = await getActivityData(
    chainId,
    communityId
  )
  const { metaData } = await getCommunityData(
    chainId,
    communityId.toLowerCase()
  )

  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <CommunityActivity proposals={proposals} communityName={metaData.name} chainId={chainId} />
    </>
  )
}
