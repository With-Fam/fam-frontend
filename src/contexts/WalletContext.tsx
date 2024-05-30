'use client'

import { PropsWithChildren } from 'react'
import { PrivyProvider } from '@privy-io/react-auth'
import { createConfig, http } from 'wagmi'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from '@privy-io/wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { mapChainIdToEndpoint } from '@/utils/alchemy/mapChainIdToEndpoint'
import { AirstackProvider } from '@airstack/airstack-react'

const queryClient = new QueryClient()

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(mapChainIdToEndpoint(base.id)),
    [baseSepolia.id]: http(mapChainIdToEndpoint(baseSepolia.id)),
  },
})

export const WalletContext = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <AirstackProvider apiKey={process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? ''}>
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
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <Toaster />
            {children}
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </AirstackProvider>
  )
}
