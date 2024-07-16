import '@/styles/global.scss'
import '@/styles/quill-default.scss'
import '@/styles/quill-editor.scss'
import '@/styles/quill-toolbar.scss'

import { WalletContext } from '@/contexts/WalletContext'
import type { PropsWithChildren } from 'react'
import { ProgressBar } from '@/components/shared'

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background font-abc">
        <ProgressBar />
        <WalletContext>{children}</WalletContext>
      </body>
    </html>
  )
}
