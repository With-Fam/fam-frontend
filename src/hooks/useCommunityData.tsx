import usePartyInfo from '@/hooks/usePartyInfo'
import { useParams } from 'next/navigation'

const useCommunityData = () => {
  const { community } = useParams()
  const { partyInfo, members, loading } = usePartyInfo(community)

  return {
    partyInfo,
    members,
    loading,
  }
}

export default useCommunityData
