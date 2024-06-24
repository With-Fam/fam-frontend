import { TabList } from '@/components/Pages/CommunityPage'
import AboutPage from '@/components/Pages/CommunityPage/AboutPage'
import Header from '@/components/Pages/CommunityPage/Header'
import { TOGGLE_DATA } from '@/content/community'

type CommunityAboutProps = {
  params: { community: string; network: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function About(
  _props: CommunityAboutProps
): Promise<JSX.Element> {
  return (
    <>
      <Header />
      <TabList items={TOGGLE_DATA} />
      <AboutPage />
    </>
  )
}
