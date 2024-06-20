import { CommunityMembers, TabList } from '@/components/Pages/CommunityPage'
import Header from '@/components/Pages/CommunityPage/Header'
import { TOGGLE_DATA } from '@/content/community'

import { getChainId } from '@/utils/getChainId'
import getOwners from '@/utils/party/getMembers'
import { Address } from 'viem'

type CommunityProfileProps = {
  params: { community: string; network: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getMemberData(chainId: number, collection: Address) {
  const daotokenOwners = await getOwners(collection)
  const dao = { daotokenOwners }
  return dao
}

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  const { community, network } = _props.params
  const chainId = getChainId(network.toUpperCase().replace('-', '_'))

  const data: any = await getMemberData(chainId, community as Address)
  return (
    <>
      <Header />
      <TabList items={TOGGLE_DATA} />
      <CommunityMembers data={data as any} />
    </>
  )
}
