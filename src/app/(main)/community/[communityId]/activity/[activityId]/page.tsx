// Types
import type { Metadata } from 'next'
interface CommunityProfileProps {
  params: {
    activityId: string
  }
}

// Local Components
import { ActivitySection } from '@/components/community/activity'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Community Profile',
  description: 'to do',
}
const CommunityProfile = ({ params }: CommunityProfileProps): JSX.Element => {
  const { activityId } = params
  return (
    <>
      <div className="h-20" />
      <ActivitySection activityId={activityId} />
    </>
  )
}

export default CommunityProfile
