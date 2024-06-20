'use client'

import { createContext, useContext, useMemo } from 'react'
import useCommunityData from '@/hooks/useCommunityData'

const CommunityContext = createContext(null)

const CommunityProvider = ({ children }: any) => {
  const communityData = useCommunityData()

  const value: any = useMemo(() => ({ ...communityData }), [communityData])

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  )
}

export const useCommunityProvider = () => {
  const context = useContext(CommunityContext)
  if (!context) {
    throw new Error(
      'useCommunityProvider must be used within an CommunityProvider'
    )
  }
  return context
}

export default CommunityProvider
