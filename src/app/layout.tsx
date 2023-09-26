// Framework
import { ReactNode } from 'react'

// Styles
import './global.scss'

// Local Components
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='font-abc'>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
