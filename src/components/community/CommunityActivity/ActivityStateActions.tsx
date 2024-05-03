'use client'

import type { ProposalFragment } from '@/data/subgraph/sdk.generated'

type ActivityStateActionsProps = {
  proposal: ProposalFragment
  chainId: number
}

const ActivityStateActions = ({
  proposal,
  chainId,
}: ActivityStateActionsProps): JSX.Element => {
  return <></>
}

export default ActivityStateActions
