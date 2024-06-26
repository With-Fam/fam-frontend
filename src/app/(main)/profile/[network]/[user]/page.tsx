import type { Metadata } from 'next'
import { Address } from 'viem'
import ProfilePage from '@/components/Pages/ProfilePage'

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

interface UsersProfileProps {
  params: { user: Address; network: number }
}

const Profile = ({ params }: UsersProfileProps): JSX.Element => {
  const { user } = params

  if (!user) {
    return <div className="px-16">User not found</div>
  }

  return <ProfilePage />
}

export default Profile
