import { CommunityMembers, TabList } from '@/components/community'
import { TOGGLE_DATA } from '@/content/community'
type CommunityProfileProps = {
  params: { community: string; network: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
import { getChainId } from '@/utils/getChainId'
import getOwners from '@/utils/party/getMembers'
import { Address } from 'viem'

async function getMemberData(chainId: number, collection: Address) {
  const daotokenOwners = await getOwners(collection)
  const dao = { daotokenOwners }
  return dao
}

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export default async function CommunityProfile(
  _props: CommunityProfileProps
): Promise<JSX.Element> {
  const { community, network } = _props.params
  const chainId = getChainId(network.toUpperCase().replace('-', '_'))

  const data: any = await getMemberData(chainId, community as Address)
  console.log('SWEETS MEMBERS', data)
  return (
    <>
      <TabList items={TOGGLE_DATA} />
      <CommunityMembers data={data as any} />
    </>
  )
}
