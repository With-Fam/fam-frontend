// Framework
import type { Metadata } from 'next'

// Local Components
import { CreateNFT, CrowdFund, SendFunds } from '@/components/create-activity'

// Types
type AddActionPageProps = {
  params: {
    action: string
  }
}

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Add Action',
  description: 'Add Action',
}

const AddActionPage = ({
  params: { action },
}: AddActionPageProps): JSX.Element => {
  switch (action) {
    case 'crowdfund':
      return <CrowdFund />
    case 'send-funds':
      return <SendFunds />
    case 'nft':
      return <CreateNFT />
    default:
      return <div>Not found!</div>
  }
}

export default AddActionPage
