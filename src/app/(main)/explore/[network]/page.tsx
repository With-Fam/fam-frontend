// Components
// import { Toggle } from '@/stories'
import {
  Communities,
  ExploreHeader,
  ExploreHeaderMobile,
} from '@/components/explore'
import { getChainId } from '@/utils/getChainId'
// Types
import type { Metadata } from 'next'
type ExplorePageProps = {
  searchParams: {
    page: string
    type: 'new' | 'trending'
  }
  params: { network: string }
}

// Content
import { getExploreData } from '@/app/(main)/explore/[network]/actions'
import ExplorePagination from '@/components/explore/ExplorePagination'
// import { EXPLORE_TOGGLE_DATA } from '@/content/explore'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

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
  searchParams,
  params,
}: ExplorePageProps): Promise<JSX.Element> => {
  const limit = 100
  const { network } = params
  const chainId = getChainId(network.toUpperCase().replace('-', '_'))

  const { communities, count } = await getExploreData({
    limit,
    chainId,
    page: searchParams.page,
  })

  return (
    <>
      <ExploreHeader />
      <ExploreHeaderMobile />
      {/* <Toggle
        type={searchParams.type}
        items={EXPLORE_TOGGLE_DATA}
        defaultType="trending"
      /> */}
      <div className="pt-8" />
      <Communities items={communities} />
      <ExplorePagination
        page={searchParams.page || '1'}
        hasNextPage={count > limit * Number(searchParams.page || '1')}
      />
    </>
  )
}

export default ExplorePage
