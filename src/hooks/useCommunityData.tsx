import useHosts from '@/hooks/useHosts'
import usePartyInfo from '@/hooks/usePartyInfo'
import { useParams } from 'next/navigation'

const useCommunityData = () => {
  const { community } = useParams()
  const { partyInfo, members, loading, avatars } = usePartyInfo(community)
  const { hosts } = useHosts(members)

  return {
    partyInfo,
    members,
    loading,
    avatars,
    hosts,
  }
}

export default useCommunityData
