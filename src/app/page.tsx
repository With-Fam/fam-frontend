// Framework
import type { Metadata } from 'next'

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
        <h1 className="text-3xl font-bold underline">This is the HomePage</h1>
      </div>
    </>
  )
}
