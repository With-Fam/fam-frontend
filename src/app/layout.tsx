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

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background font-abc">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
