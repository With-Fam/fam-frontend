import getCrowdfundContract from '@/lib/party/getCrowdfundContract'
import getCrowfundLifecycle from '@/lib/party/getCrowfundLifecycle'
import { useCallback, useEffect, useState } from 'react'

export enum CrowdfundLifecycle {
  Invalid,
  Active,
  Lost,
  Won,
  Finalized,
}

const useCrowdfund = (community: any) => {
  const [crowfundAddress, setCrowdfundAddress] = useState(null)
  const [crowfundLifecyle, setCrowdfundLifecyle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const getCrowdfundLifeCyle = useCallback(async () => {
    if (!community) return
    setLoading(true)
    const crowdfund = await getCrowdfundContract(community)
    setCrowdfundAddress(crowdfund)
    const lifecyle = await getCrowfundLifecycle(crowdfund)
    setCrowdfundLifecyle(lifecyle)
    setLoading(false)
  }, [community])

  useEffect(() => {
    getCrowdfundLifeCyle()
  }, [getCrowdfundLifeCyle])

  return {
    crowfundAddress,
    crowfundLifecyle,
    getCrowdfundLifeCyle,
    loading,
  }
}

export default useCrowdfund
