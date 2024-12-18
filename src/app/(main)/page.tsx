import type { Metadata } from 'next'
import { CollectiveCulture, FAQ, FeatureWidgets, Hero } from '@/components/home'

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
}

const Home = () => (
  <>
    <Hero />
    <CollectiveCulture />
    <FeatureWidgets />
    <FAQ />
  </>
)

export default Home
