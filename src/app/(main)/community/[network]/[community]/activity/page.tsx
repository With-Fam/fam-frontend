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
import getAllProposalsWithLogs from '@/utils/party/getAllProposalsWithLogs'
import { CHAIN_ID } from '@/constants/defaultChains'

export const metadata: Metadata = {
  title: 'Community Profile',
  description: 'to do',
}

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  const { community } = _props.params
  const proposals = await getAllProposalsWithLogs(community)
  const { metaData } = await getCommunityData(CHAIN_ID, community.toLowerCase())

  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <CommunityActivity
        community={community}
        chainId={CHAIN_ID}
        proposals={proposals}
        communityName={metaData?.name}
      />
    </>
  )
}
