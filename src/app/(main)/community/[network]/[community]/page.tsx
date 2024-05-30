'use client'

// Local Components
import { TabList } from '@/components/community'
import CommunityHeader from '@/components/community/CommunityHeader'
import CommunityHome from '@/components/community/CommunityHome'
import { TOGGLE_DATA } from '@/content/community'
import AddressCopy from '@/modules/create-community/components/review/AddressCopy'
import { AddressType } from '@/types'

// Types
type CommunityProfileProps = {
  params: { community: string; network: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export default function CommunityProfile(
  _props: CommunityProfileProps
): JSX.Element {
  const { community, network } = _props.params

  return (
    <>
      <CommunityHeader />
      <TabList items={TOGGLE_DATA} />
      <div>
        <CommunityHome />
      </div>
    </>
  )
}
