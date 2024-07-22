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
        `/api/party/activiy?userAddress=${userAddress}`
      )

      const data = await response.json()

      setActivity(data)
      setJoinedParties(data.activity.user.crowdfundContributions)
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
