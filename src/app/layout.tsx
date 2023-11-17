import type { Metadata } from 'next'
import { WalletContext } from '@/contexts/WalletContext'
// Types
import type { PropsWithChildren } from 'react'

// Styles
import '@/styles/global.scss'
import '@/styles/quill-default.scss'
import '@/styles/quill-editor.scss'
import '@/styles/quill-toolbar.scss'

// Context
import { MockStoreProvider } from '@/contexts/mock-store'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
}

/**
 * Component
 */
export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background font-abc">
        <WalletContext>
          <MockStoreProvider>{children}</MockStoreProvider>
        </WalletContext>
      </body>
    </html>
  )
}
