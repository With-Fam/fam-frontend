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
import { Suspense } from 'react'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  metadataBase: new URL('https://withfam.xyz'),
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
    url: 'https://withfam.xyz',
    title: 'Your fam, onchain',
    description:
      'Fam is a space for music communities to grow, collaborate and collectively fund creative projects',
    images: ['/opengraph-image.png'],
  },
}

const Home = (): JSX.Element => {
  return (
    <Suspense>
      <Hero />
      <CollectiveCulture />
      <FeatureWidgets />
      <FAQ />
    </Suspense>
  )
}

export default Home
