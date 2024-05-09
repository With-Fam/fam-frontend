import type { Metadata } from 'next'
import { CommunityActivity, TabList } from '@/components/community'
import { TOGGLE_DATA } from '@/content/community'
type CommunityProfileProps = {
  params: {
    network: string
    community: `0x${string}`
  }
}
import { getCommunityData } from '@/app/(main)/community/[network]/[community]//activity/actions'
import { getChainId } from '@/utils/getChainId'
import getAllProposalsWithLogs from '@/utils/party/getAllProposalsWithLogs'

export const metadata: Metadata = {
  title: 'Community Profile',
  description: 'to do',
}

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  const { community, network } = _props.params
  const chainId = getChainId(network.toUpperCase().replace('-', '_'))
  const proposals = await getAllProposalsWithLogs(community)
  const { metaData } = await getCommunityData(chainId, community.toLowerCase())

  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <CommunityActivity
        community={community}
        chainId={chainId}
        proposals={proposals}
        communityName={metaData?.name}
      />
    </>
  )
}
