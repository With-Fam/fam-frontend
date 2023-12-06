'use client'
import { PropsWithChildren } from 'react'
import { PrivyProvider } from '@privy-io/react-auth'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'
import { goerli } from '@wagmi/chains'
import { configureChains } from 'wagmi'
import { Toaster } from 'react-hot-toast'

import { publicProvider } from 'wagmi/providers/public'

const configureChainsConfig = configureChains([goerli], [publicProvider()])

const handleLogin = (data: { id: string }) => {
  console.log('Login', data.id)
  console.log('data::', data)
}

/**
 * Component
 */

export const WalletContext = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      onSuccess={handleLogin}
      config={{
        walletConnectCloudProjectId: 'a2ca754e356641b9ab15dae82876d257',
        loginMethods: ['wallet', 'email', 'apple', 'google', 'twitter'],
        appearance: {
          showWalletLoginFirst: true,
          theme: 'light',
          accentColor: '#E35A30',
          logo: '/assets/images/logo.svg',
        },
      }}
    >
      <Toaster />
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        {children}
      </PrivyWagmiConnector>
    </PrivyProvider>
  )
}
