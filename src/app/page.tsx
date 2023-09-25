// Framework
import type { Metadata } from 'next'

// Local Component
import Heading from '@/stories/Heading'

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
      <div>
        <Heading as="h1">This is the HomePage</Heading>
      </div>
    </>
  )
}
