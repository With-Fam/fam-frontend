import getCrowdfundContract from '@/lib/party/getCrowdfundContract'
import getCrowfundLifecycle from '@/lib/party/getCrowfundLifecycle'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    const init = async () => {
      const crowdfund = await getCrowdfundContract(community)
      setCrowdfundAddress(crowdfund)
      const lifecyle = await getCrowfundLifecycle(crowdfund)
      setCrowdfundLifecyle(lifecyle)
    }
    if (!community) return
    init()
  }, [community])

  return {
    crowfundAddress,
    crowfundLifecyle,
  }
}

export default useCrowdfund
