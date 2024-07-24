import usePartyInfo from '@/hooks/usePartyInfo'
import { useParams } from 'next/navigation'

const useCommunityData = () => {
  const { community } = useParams()
  const { partyInfo, members, loading, avatars } = usePartyInfo(community)

  return {
    partyInfo,
    members,
    loading,
    avatars,
  }
}

export default useCommunityData
