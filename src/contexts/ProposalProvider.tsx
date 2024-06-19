'use client'

import { createContext, useContext, useMemo } from 'react'
import useProposalData from '@/hooks/useProposalData'

const ProposalContext = createContext(null)

const ProposalProvider = ({ children }: any) => {
  const proposalData = useProposalData()

  const value: any = useMemo(() => ({ ...proposalData }), [proposalData])

  return (
    <ProposalContext.Provider value={value}>
      {children}
    </ProposalContext.Provider>
  )
}

export const useProposalProvider = () => {
  const context = useContext(ProposalContext)
  if (!context) {
    throw new Error(
      'useAppleMusicProvider must be used within an ProposalProvider'
    )
  }
  return context
}

export default ProposalProvider
