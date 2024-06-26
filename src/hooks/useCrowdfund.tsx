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

  const getCrowdfundLifeCyle = useCallback(async () => {
    if (!community) return
    const crowdfund = await getCrowdfundContract(community)
    setCrowdfundAddress(crowdfund)
    const lifecyle = await getCrowfundLifecycle(crowdfund)
    setCrowdfundLifecyle(lifecyle)
  }, [community])

  useEffect(() => {
    getCrowdfundLifeCyle()
  }, [getCrowdfundLifeCyle])

  return {
    crowfundAddress,
    crowfundLifecyle,
    getCrowdfundLifeCyle,
  }
}

export default useCrowdfund
