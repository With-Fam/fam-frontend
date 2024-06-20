'use client'

import { TabList } from '@/components/Pages/CommunityPage'
import Header from '@/components/Pages/CommunityPage/Header'
import { TOGGLE_DATA } from '@/content/community'
import { useFormStore } from '@/modules/create-community'
import { useEffect } from 'react'
import HomePage from '@/components/Pages/CommunityPage/HomePage'

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
      <Header />
      <TabList items={TOGGLE_DATA} />
      <HomePage />
    </>
  )
}
