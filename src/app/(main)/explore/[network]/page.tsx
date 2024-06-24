import {
  Communities,
  ExploreHeader,
  ExploreHeaderMobile,
} from '@/components/explore'
import { getChainId } from '@/lib/getChainId'
import type { Metadata } from 'next'
import getAllParties from '@/lib/party/getAllParties'

type ExplorePageProps = {
  searchParams: {
    page: string
    type: 'new' | 'trending'
  }
  params: { network: string }
}

export const metadata: Metadata = {
  title: 'Explore Communities',
  description: 'All Fam communities',
  keywords: [
    'Music Community Platform',
    'Collaborative Music Space',
    'Collective Funding for Music Projects',
    'Empowering Musicians',
    'Community Growth and Engagement',
    'Creative Project Funding',
    'Music Collaboration Network',
    'Support for Music Creators',
    'Music Discovery and Promotion',
    'Diverse Music Genres',
    'Innovative Music Community',
    'Music Community Building',
  ],
  openGraph: {
    type: 'website',
    url: 'https://todo.dev/explore',
    title: 'todo.dev',
    description: 'to do',
    siteName: 'todo.dev',
    images: [{ url: '/img/favicon.png', width: 128, height: 128 }],
  },
}

const ExplorePage = async ({
  params,
}: ExplorePageProps): Promise<JSX.Element> => {
  const { network } = params
  const chainId = getChainId(network.toUpperCase().replace('-', '_'))

  const parties = await getAllParties(chainId as any)

  return (
    <>
      <ExploreHeader />
      <ExploreHeaderMobile />
      <div className="pt-8" />
      <Communities items={parties} />
    </>
  )
}

export default ExplorePage
