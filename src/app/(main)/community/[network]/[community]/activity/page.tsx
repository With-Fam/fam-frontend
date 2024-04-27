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
    network: string
    community: `0x${string}`
  }
}

// Actions
import { getCommunityData } from '@/app/(main)/community/[network]/[community]//activity/actions'
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
  const { community, network } = _props.params
  const chainId = getChainId(network.toUpperCase().replace('-', '_'))
  const proposals: ProposalFragment[] = await getActivityData(
    chainId,
    community
  )
  const { metaData } = await getCommunityData(chainId, community.toLowerCase())

  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <CommunityActivity
        chainId={chainId}
        proposals={proposals}
        communityName={metaData?.name}
      />
    </>
  )
}
