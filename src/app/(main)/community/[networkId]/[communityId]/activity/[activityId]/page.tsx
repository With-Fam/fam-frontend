// Types
import { ProposalQuery } from '@/data/subgraph/sdk.generated'
import type { Metadata } from 'next'
interface ActivityProfileProps {
  params: {
    activityId: string
  }
}

// Local Components
import { ActivitySection } from '@/components/community/activity'

// API
import { SDK } from '@/data/subgraph/client'

async function getProposalData(chainId: number, proposalId: string) {
  const { proposal } = await SDK.connect(chainId).proposal({
    proposalId,
  })

  if (typeof proposal?.proposalId === 'string') {
    return proposal as ProposalQuery["proposal"]
  } else {
    return null
  }
}

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Activity Profile',
  description: 'to do',
}
const ActivityProfile = async ({
  params,
}: ActivityProfileProps): Promise<JSX.Element> => {
  const { activityId } = params
  const chainId = 5 // Hardcoded. Should be passed in from the router
  const proposal: ProposalQuery["proposal"] | null = await getProposalData(
    chainId,
    activityId
  )

  return (
    <>
      <div className="h-20" />
      <ActivitySection proposal={proposal} chainId={chainId} />
    </>
  )
}

export default ActivityProfile
