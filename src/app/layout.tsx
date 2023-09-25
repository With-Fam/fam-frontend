// Framework
import { ReactNode } from 'react'

// Styles
import './global.scss'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
