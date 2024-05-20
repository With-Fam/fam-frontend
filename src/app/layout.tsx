<<<<<<< HEAD
import type { Metadata } from 'next'
import { WalletContext } from '@/contexts/WalletContext'
import { DaoContext } from '@/contexts/DaoContext'
=======
// framework
import type { Metadata } from 'next'
>>>>>>> origin/main

// Types
import type { PropsWithChildren } from 'react'

// Styles
import '@/styles/global.scss'
import '@/styles/quill-default.scss'
import '@/styles/quill-editor.scss'
import '@/styles/quill-toolbar.scss'

// Context
import { MockStoreProvider } from '@/contexts/mock-store'

<<<<<<< HEAD
// Components
import { ProgressBar } from '@/components/shared'
import SessionExpired from '@/components/shared/SessionExpired'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
}
=======
// Local Components
import { Navbar, Footer } from '@/components/shared'

/*--------------------------------------------------------------------*/
>>>>>>> origin/main

/**
 * Component
 */
<<<<<<< HEAD
=======

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

>>>>>>> origin/main
export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background font-abc">
<<<<<<< HEAD
        <ProgressBar />
        <WalletContext>
          <SessionExpired />
          <DaoContext>
            <MockStoreProvider>{children}</MockStoreProvider>
          </DaoContext>
        </WalletContext>
=======
        <Navbar logged={false} />
        <main className="grow">{children}</main>
        <Footer />
>>>>>>> origin/main
      </body>
    </html>
  )
}
