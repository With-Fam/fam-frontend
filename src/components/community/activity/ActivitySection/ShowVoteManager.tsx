'use client'

// Framework
import { LinkProps } from 'next/link'

import { ProposalVote } from '@/data/subgraph/sdk.generated'

// Types
import { AddressType } from '@/types'
type ShowVoteManagerProps = {
  chainId: number
  governorAddress: AddressType
  userAddress: AddressType
  timeCreated: string
  state: number | null
  signerVote?: ProposalVote
  proposalId: string
  className: string
  href: LinkProps['href']
}

const ShowVoteManager = ({
  chainId,
  governorAddress,
  userAddress,
  timeCreated,
  state,
  signerVote,
  proposalId,
  className,
  href,
}: ShowVoteManagerProps): JSX.Element => {
  return <div>Loading...</div>
}

export default ShowVoteManager
