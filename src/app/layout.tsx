import type { Metadata } from 'next'
import { WalletContext } from '@/contexts/WalletContext'
import { DaoContext } from '@/contexts/DaoContext'

// Types
import type { PropsWithChildren } from 'react'

// Styles
import '@/styles/global.scss'
import '@/styles/quill-default.scss'
import '@/styles/quill-editor.scss'
import '@/styles/quill-toolbar.scss'

// Context
import { MockStoreProvider } from '@/contexts/mock-store'

// Components
import { ProgressBar } from '@/components/shared'

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
        <ProgressBar />
        <WalletContext>
          <DaoContext>
            <MockStoreProvider>{children}</MockStoreProvider>
          </DaoContext>
        </WalletContext>
      </body>
    </html>
  )
}
