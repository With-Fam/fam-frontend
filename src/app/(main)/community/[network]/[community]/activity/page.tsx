import type { Metadata } from 'next'
import { CommunityActivity, TabList } from '@/components/community'
import { TOGGLE_DATA } from '@/content/community'
import type { ProposalFragment } from '@/data/subgraph/sdk.generated'
type CommunityProfileProps = {
  params: {
    network: string
    community: `0x${string}`
  }
}
import { getCommunityData } from '@/app/(main)/community/[network]/[community]//activity/actions'
import { getChainId } from '@/utils/getChainId'
import getLastProposalId from '@/utils/party/getLastProposalId'
import getAllProposals from '@/utils/party/getAllProposals'

export const metadata: Metadata = {
  title: 'Community Profile',
  description: 'to do',
}

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  const { community, network } = _props.params
  const chainId = getChainId(network.toUpperCase().replace('-', '_'))
  const proposals: any[] = await getAllProposals(community)
  console.log('SWEETS proposals', proposals)

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
