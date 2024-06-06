'use client'

import { TabList } from '@/components/community'
import CommunityHeader from '@/components/community/CommunityHeader'
import CommunityHome from '@/components/community/CommunityHome'
import { TOGGLE_DATA } from '@/content/community'
import { useFormStore } from '@/modules/create-community'
import { useEffect } from 'react'

type CommunityProfileProps = {
  params: { community: string; network: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function CommunityProfile(
  _props: CommunityProfileProps
): JSX.Element {
  const { created } = _props.searchParams
  const { resetForm } = useFormStore()

  useEffect(() => {
    if (created === 'true') resetForm()
  }, [created])

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
