import { TabList } from '@/components/Pages/CommunityPage'
import MembersPage from '@/components/Pages/CommunityPage/MembersPage'
import Header from '@/components/Pages/CommunityPage/Header'
import { TOGGLE_DATA } from '@/content/community'

export default async function CommunityProfile(): Promise<JSX.Element> {
  return (
    <>
      <Header />
      <TabList items={TOGGLE_DATA} />
      <MembersPage />
    </>
  )
}
