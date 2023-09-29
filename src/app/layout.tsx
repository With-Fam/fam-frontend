// Framework
import { ReactNode } from 'react'

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
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background font-abc">
        <Navbar logged={Math.random() < 0.5} />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
