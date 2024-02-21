'use client'
import { PropsWithChildren } from 'react'
import { PrivyProvider } from '@privy-io/react-auth'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'
import { configureChains } from 'wagmi'
import { Toaster } from 'react-hot-toast'
import { PUBLIC_DEFAULT_CHAINS } from '@/constants/defaultChains'

import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'

// Public default chains -> constants/defaultChains.ts
const configureChainsConfig = configureChains(PUBLIC_DEFAULT_CHAINS, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
  publicProvider(),
])

/**
 * Component
 */

export const WalletContext = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        supportedChains: PUBLIC_DEFAULT_CHAINS,
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
