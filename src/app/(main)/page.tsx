import type { Metadata } from 'next'
import { CollectiveCulture, FAQ, FeatureWidgets, Hero } from '@/components/home'
import { Suspense } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL('https://app.withfam.xyz'),
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
    url: 'https://app.withfam.xyz',
    title: 'Your fam, onchain',
    description:
      'Fam is a space for music communities to grow, collaborate and collectively fund creative projects',
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
