import getZora1155Uri from '@/lib/zora/getZora1155Uri'
import { useEffect, useState } from 'react'

const usePartyInfo = (community: any) => {
  const [partyInfo, setPartyInfo] = useState<any>(null)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [avatars, setAvatars] = useState(null)

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const contractUri = await getZora1155Uri(community)
      let response = await fetch(contractUri as string)
      const metadata = await response.json()
      setPartyInfo(metadata)

      response = await fetch(`/api/party/members?party=${community}`)
      const members = await response.json()
      setMembers(members.memberships)

      const addresses = members.memberships.map(
        (member: any) => member.userAddress
      )
      response = await fetch(
        `/api/party/avatars?addresses=${JSON.stringify(addresses)}`
      )
      const data = await response.json()
      setAvatars(data)
      setLoading(false)
    }

    if (!community) return
    init()
  }, [community])

  return {
    partyInfo,
    members,
    loading,
    avatars,
  }
}

export default usePartyInfo
