// Framework
import type { Metadata } from 'next'

// Local Component
import Hero from '@/components/home/Hero'
import TrendingSection from '@/components/home/TrendingSection'
import CollectiveCulture from '@/components/home/CollectiveCulture'
import FeatureWidgets from '@/components/home/FeatureWidgets'
import FAQ from '@/components/home/FAQ'

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

export default function Home() {
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
