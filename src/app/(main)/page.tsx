// Framework
import type { Metadata } from 'next'

// Local Component
import {
  CollectiveCulture,
  FAQ,
  FeatureWidgets,
  Hero,
  TrendingSection,
} from '@/components/home'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Your fam, onchain',
  description:
    'Fam is a space for music communities to grow, collaborate and collectively fund creative projects',
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
    url: 'https://todo.dev',
    title: 'todo.dev',
    description:
      'Fam is a space for music communities to grow, collaborate and collectively fund creative projects',
    siteName: 'todo.dev',
    images: [{ url: '/img/favicon.png', width: 128, height: 128 }],
  },
}

const Home = (): JSX.Element => {
  return (
    <>
      <Hero />
      <TrendingSection />
      <CollectiveCulture />
      <FeatureWidgets />
      <FAQ />
    </>
  )
}

export default Home