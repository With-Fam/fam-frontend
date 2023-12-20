// Components
import { Toggle } from '@/stories'
import { Communities, ExploreHeader, ExploreHeaderMobile } from '@/components/explore'

// Types
import type { Metadata } from 'next'
interface ExploreProps {
  searchParams: {
    type: string
    search: string
  }
}

// Content
import { EXPLORE_TOGGLE_DATA } from '@/content/explore'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Explore Communities',
  description: 'to do',
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

const Explore = ({ searchParams }: ExploreProps): JSX.Element => {
  const { type, search } = searchParams

  return (
    <>
      <ExploreHeader />
      <ExploreHeaderMobile />
      <Toggle type={type} items={EXPLORE_TOGGLE_DATA} defaultType="all" />
      <Communities type={type} search={search} />
    </>
  )
}

export default Explore
