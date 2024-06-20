import CommunityProvider from '@/contexts/CommunityProvider'
import ProposalProvider from '@/contexts/ProposalProvider'
import type { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <CommunityProvider>
    <ProposalProvider>{children}</ProposalProvider>
  </CommunityProvider>
)

export default RootLayout
