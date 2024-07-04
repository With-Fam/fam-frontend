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

// pages/_app.js or a custom component to include metadata in the head
import Head from 'next/head';

export const metadata: Metadata = {
  metadataBase: new URL('https://withfam.xyz'),
  title: 'Your fam, onchain',
  description: 'Fam is a space for music communities to grow, collaborate and collectively fund creative projects',
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
    description: 'Fam is a space for music communities to grow, collaborate and collectively fund creative projects',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image'
      }
    ]
  }
};

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />

        {/* Open Graph Metadata */}
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
      </Head>
      <Suspense>
        <Hero />
        <CollectiveCulture />
        <FeatureWidgets />
        <FAQ />
      </Suspense>
    </>
  );
}

export default Home;