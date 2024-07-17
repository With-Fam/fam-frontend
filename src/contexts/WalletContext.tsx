'use client'

import { PropsWithChildren } from 'react'
import { PrivyProvider } from '@privy-io/react-auth'
import { Toaster } from 'react-hot-toast'

export const WalletContext = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        walletConnectCloudProjectId: 'a2ca754e356641b9ab15dae82876d257',
        loginMethods: ['wallet', 'email'],
        appearance: {
          showWalletLoginFirst: true,
          theme: 'light',
          accentColor: '#E35A30',
          logo: '/assets/images/logo.svg',
        },
      }}
    >
      <Toaster />
      {children}
    </PrivyProvider>
  )
}
