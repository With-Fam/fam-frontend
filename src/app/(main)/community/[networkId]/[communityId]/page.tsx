'use client'
// Local Components
import {
  BidComponent,
  FoundersComponent,
  RecentDrops,
} from '@/components/community'

/*--------------------------------------------------------------------*/

type Props = {
  params: { communityId: string; networkSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function CommunityProfile(_props: Props): JSX.Element {
  console.log('_props::', _props)

  return (
    <>
      <BidComponent />
      <FoundersComponent />
      <RecentDrops />
    </>
  )
}
