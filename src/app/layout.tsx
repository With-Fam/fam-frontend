// Framework
import { ReactNode } from 'react'

// Styles
import './global.scss'

// Local Components
import Navbar from '@/components/shared/Navbar'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
