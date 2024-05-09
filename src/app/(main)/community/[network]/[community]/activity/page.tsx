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
import getAllProposals from '@/utils/party/getAllProposals'
import getProposedEvents from '@/utils/party/getProposedEvents'
import getDecodedProposedEvent from '@/utils/party/getDecodedProposedEvent'
import getFormattedProposals from '@/utils/party/getFormattedProposals'

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
  const eventLogs = await getProposedEvents(community)
  const decodedLogs = eventLogs.map(
    (log) => getDecodedProposedEvent(log.data) as any
  )
  const updatedProposals = getFormattedProposals(proposals, decodedLogs)

  const { metaData } = await getCommunityData(chainId, community.toLowerCase())

  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <CommunityActivity
        community={community}
        chainId={chainId}
        proposals={updatedProposals}
        communityName={metaData?.name}
      />
    </>
  )
}
