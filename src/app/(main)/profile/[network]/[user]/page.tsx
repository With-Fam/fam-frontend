// Types
import type { Metadata } from 'next'
interface UsersProfileProps {
  searchParams: {
    type: string
    page: string
  }
  params: { user: string; network: string }
}

// Content
import ProfileClientPage from '@/components/profile/ProfileClientPage'
import { getChainId } from '@/utils/getChainId'

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
    url: 'https://todo.dev/community',
    title: 'todo.dev',
    description: 'to do',
    siteName: 'todo.dev',
    images: [{ url: '/img/favicon.png', width: 128, height: 128 }],
  },
}

const UserPage = ({ params, searchParams }: UsersProfileProps): JSX.Element => {
  const { type = 'communities', page } = searchParams
  const { user, network } = params

  const chainID = getChainId(network.toUpperCase().replace('-', '_'))

  if (!user) {
    return <div className="px-16">User not found</div>
  }

  return (
    <ProfileClientPage
      type={type}
      user={user}
      page={page}
      chainID={chainID}
      network={network}
    />
  )
}

export default UserPage
