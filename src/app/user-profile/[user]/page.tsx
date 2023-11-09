// Framework
import Image from 'next/image'

// Local Components
import { Toggle, Heading } from '@/stories'
import {
  UserActivity,
  UserCommunity,
  UserKey,
} from '@/components/user-profile/'

// Types
import type { Metadata } from 'next'
interface UsersProfileProps {
  searchParams: {
    type: string
  }
  params: { user: string }
}

// Content
import { USERS_TOGGLE_DATA, USERS_PROFILE_DATA } from '@/content/users-profile'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'User Profile',
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

export async function generateStaticParams(): Promise<{ user: string }[]> {
  const users = [
    'agcook.eth',
    'dannylharle.eth',
    'planet1999.eth',
    'pcmusic.eth',
  ]

  return users.map((user) => ({
    user,
  }))
}

export default function Page({
  params,
  searchParams,
}: UsersProfileProps): JSX.Element {
  const { type } = searchParams
  const { user } = params
  const currentUser = USERS_PROFILE_DATA.find((element) => {
    return element.name === user
  })

  if (!currentUser) {
    return <div className="px-16">User not found</div>
  }

  return (
    <div className="px-4">
      <div className="mt-24 flex flex-col items-center">
        <Image
          src={currentUser.image}
          alt=""
          width={80}
          height={80}
          className="rounded-full"
        />
        <Heading as="h5" className="mt-3">
          {currentUser.name}
        </Heading>
        <div className="mb-4 mt-2">
          <UserKey>{currentUser.key}</UserKey>
        </div>
        <Toggle
          defaultType="home"
          center={true}
          type={type}
          items={USERS_TOGGLE_DATA}
          dynamicReference={{ user }}
        />
      </div>
      {type === 'communities' && (
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-4">
          {currentUser.communities.map((community, index) => {
            return <UserCommunity key={index} community={community} />
          })}
        </div>
      )}
      {type === 'activity' && (
        <div className="mx-auto flex max-w-[960px] flex-col gap-4">
          {currentUser.activity.map((activity, index) => {
            return <UserActivity key={index} activity={activity} />
          })}
        </div>
      )}
    </div>
  )
}
