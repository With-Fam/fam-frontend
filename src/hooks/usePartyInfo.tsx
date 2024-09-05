import useConnectedWallet from '@/hooks/useConnectedWallet'
import getZora1155Uri from '@/lib/zora/getZora1155Uri'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const usePartyInfo = (community: any) => {
  const [partyInfo, setPartyInfo] = useState<any>(null)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [avatars, setAvatars] = useState(null)
  const { connectedWallet } = useConnectedWallet()
  const { user } = useParams()

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      try {
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
        if (connectedWallet) addresses.push(connectedWallet)
        if (user) addresses.push(user)
        response = await fetch(
          `/api/party/avatars?addresses=${JSON.stringify(addresses)}`
        )
        const data = await response.json()
        setAvatars(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    if (!community) return
    init()
  }, [community, connectedWallet, user])

  return {
    partyInfo,
    members,
    loading,
    avatars,
  }
}

export default usePartyInfo
