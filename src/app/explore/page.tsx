// Framework
import { Communities, CommunitySearch } from '@/components/explore'
import { Toggle } from '@/stories'

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

export default async function Explore({
  searchParams,
}: ExploreProps): Promise<JSX.Element> {
  const { type, search } = searchParams

  return (
    <>
      <CommunitySearch type={type} search={search} />
      <Toggle type={type} items={EXPLORE_TOGGLE_DATA} />
      <Communities type={type} search={search} />
    </>
  )
}
