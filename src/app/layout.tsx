// framework
import type { Metadata } from 'next'

// Types
import type { PropsWithChildren } from 'react'

// Styles
import './global.scss'

// Local Components
import { Navbar, Footer } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
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
}

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background font-abc">
        <Navbar logged={false} />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
