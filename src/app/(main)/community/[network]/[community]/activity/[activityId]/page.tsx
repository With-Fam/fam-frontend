'use client'
// Types
import { ProposalQuery } from '@/data/subgraph/sdk.generated'

interface ActivityProfileProps {
  params: {
    activityId: string
    network: string
  }
}

// Local Components
import {
  ActivitySection,
  getProposalData,
} from '@/components/community/activity'

// API
import { getChainId } from '@/utils/getChainId'
import useSWR from 'swr'
import SWR_KEYS from '@/constants/swrKeys'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

const ActivityProfile = ({ params }: ActivityProfileProps): JSX.Element => {
  const { activityId, network } = params
  const chainId = getChainId(network.toUpperCase().replace('-', '_'))

  const { data: proposal } = useSWR(
    [SWR_KEYS.PROPOSAL, chainId, activityId],
    ([_, cId, aId]: [string, number, string]) => getProposalData(cId, aId)
  )

  return (
    <>
      <div className="h-20" />
      <ActivitySection proposal={proposal} chainId={chainId} />
    </>
  )
}

export default ActivityProfile
