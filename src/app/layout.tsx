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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-abc bg-background">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
