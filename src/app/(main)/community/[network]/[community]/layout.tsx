import CommunityProvider from '@/contexts/CommunityProvider'
import ProposalProvider from '@/contexts/ProposalProvider'
import type { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <CommunityProvider>
    <ProposalProvider>
      <div className="pt-[110px]">{children}</div>
    </ProposalProvider>
  </CommunityProvider>
)

export default RootLayout
