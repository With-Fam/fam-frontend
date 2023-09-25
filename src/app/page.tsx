// Framework
import type { Metadata } from 'next'

// Local Component
import AboveTheFold from '@/components/home/AboveTheFold'
import TrendingSection from '@/components/home/TrendingSection'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  keywords: [''],
  openGraph: {
    type: 'website',
    url: 'https://todo.dev',
    title: 'todo.dev',
    description: 'Page description',
    siteName: 'todo.dev',
    images: [{ url: '/img/favicon.png', width: 128, height: 128 }],
  },
}

export default function Home() {
  return (
    <>
      <AboveTheFold />
      <TrendingSection />
    </>
  )
}
