// Types
import type { Metadata } from 'next'

// Local Components
import { CommunityActivity } from '@/components/community'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Community Profile',
  description: 'to do',
}

const CommunityProfile = (): JSX.Element => <CommunityActivity />

export default CommunityProfile
