import getZora1155Uri from '@/utils/zora/getZora1155Uri'
import { useEffect, useState } from 'react'

const usePartyInfo = (community: any) => {
  const [partyInfo, setPartyInfo] = useState<any>(null)
  const [members, setMembers] = useState([])

  useEffect(() => {
    const init = async () => {
      const contractUri = await getZora1155Uri(community)
      let response = await fetch(contractUri as string)
      const metadata = await response.json()
      setPartyInfo(metadata)

      response = await fetch(`/api/party/members?party=${community}`)
      const members = await response.json()
      setMembers(members.memberships)
    }

    if (!community) return
    init()
  }, [community])

  return {
    partyInfo,
    members,
  }
}

export default usePartyInfo
