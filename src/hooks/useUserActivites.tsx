import { CHAIN_ID } from '@/constants/defaultChains'
import getPartyUris from '@/lib/party/getPartyUris'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const useUserActivites = (userAddress: Address) => {
  const [activity, setActivity] = useState(null) as any
  const [joinedParties, setJoinedParties] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const response = await fetch(
        `/api/party/activity?userAddress=${userAddress}`
      )

      const data = await response.json()
      setActivity(data)

      const crowdfundContributions =
        data.activity.user.crowdfundContributions.filter(
          (contribution: any) => contribution.networkId === CHAIN_ID
        )
      const partyAddresses = crowdfundContributions.map(
        (contribution: any) => contribution.crowdfund.ethCrowdfund_party
      )
      const uris = await getPartyUris(partyAddresses)

      const parties = crowdfundContributions.map(
        (contribution: any, i: number) => ({
          ...contribution,
          contractUri: uris[i].result,
        })
      )
      setJoinedParties(parties)
      setLoading(false)
    }
    if (!userAddress) return
    init()
  }, [userAddress])

  return {
    activity,
    joinedParties,
    loading,
  }
}

export default useUserActivites
