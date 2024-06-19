import ProposalProvider from '@/contexts/ProposalProvider'
import type { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <ProposalProvider>{children}</ProposalProvider>
)

export default RootLayout
