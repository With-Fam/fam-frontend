// Framework
import { Toggle } from '@/stories'

// Types
import type { Metadata } from 'next'
interface CommunityProfileProps {
  searchParams: {
    type: string
  }
}

// Local Components
import {
  AllDrops,
  BidComponent,
  CommunityActions,
  CommunityMembers,
  FoundersComponent,
  RecentDrops,
} from '@/components/community-profile'

// Content
import { TOGGLE_DATA } from '@/content/community-profile'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Community Profile',
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
    url: 'https://todo.dev/community-profile',
    title: 'todo.dev',
    description: 'to do',
    siteName: 'todo.dev',
    images: [{ url: '/img/favicon.png', width: 128, height: 128 }],
  },
}

export default async function CommunityProfile({
  searchParams,
}: CommunityProfileProps): Promise<JSX.Element> {
  const { type } = searchParams

  return (
    <>
      <div className="h-20" />
      <Toggle
        defaultType="home"
        center={true}
        type={type}
        items={TOGGLE_DATA}
      />
      {(type === 'home' || !type) && (
        <>
          <BidComponent />
          <FoundersComponent />
          <RecentDrops />
        </>
      )}
      {(type === 'drops' || !type) && <AllDrops />}
      {(type === 'members' || !type) && <CommunityMembers />}
      {(type === 'actions' || !type) && <CommunityActions />}
    </>
  )
}
