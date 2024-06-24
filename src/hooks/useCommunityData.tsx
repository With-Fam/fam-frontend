import usePartyInfo from '@/hooks/usePartyInfo'
import { useParams } from 'next/navigation'

const useCommunityData = () => {
  const { community } = useParams()
  const { partyInfo, members } = usePartyInfo(community)

  return {
    partyInfo,
    members,
  }
}

export default useCommunityData
