// Local Components
import { AllDrops } from '@/components/community'
import { SDK } from '@/data/subgraph/client'

/*--------------------------------------------------------------------*/

type Props = {
  params: { communityId: string; networkSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getMemberData(chainId: number, collection: string) {
  const dao = await SDK.connect(chainId).daoMembersList({
    where: {
      dao: collection.toLowerCase(),
    },
  })
  return dao
}

export default async function CommunityProfile(
  _props: Props
): Promise<JSX.Element> {
  const chainId = 5 // Hardcoded. Should be passed in from the router
  const { communityId } = _props.params
  const data: any = await getMemberData(chainId, communityId)
  return <AllDrops />
}
