'use client'

// Types
import { TokenFragment } from '@/data/subgraph/sdk.generated'
import { CHAIN_ID } from '@/types'
type FoundersComponentProps = {
  token: TokenFragment
  chainId: CHAIN_ID
}

const FoundersComponent = ({
  token,
  chainId,
}: FoundersComponentProps): JSX.Element => {
  return <></>
}

export default FoundersComponent
