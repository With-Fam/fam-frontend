'use client'

// Framework
import { useState } from 'react'

// Third Parties
import { useSWRConfig } from 'swr'
import { waitForTransaction } from 'wagmi/actions'
import { Address } from 'viem'

// Helpers
import { useChainStore } from '@/utils/stores/useChainStore'
import { useDaoStore } from '@/modules/dao'
import { governorAbi } from '@/data/contract/abis'
import SWR_KEYS from '@/constants/swrKeys'
import { getProposal } from '@/data/subgraph/requests/proposalQuery'

// Components
import ContractButton from '@/components/community/CommunityActivity/ContractButton'

// Types
import { BytesType } from '@/types'
type ArgsType<T extends Address = Address> = [
  T[],
  bigint[],
  BytesType[],
  BytesType,
  T,
]
type ExecuteManagementProps = {
  functionName: 'execute'
  args: ArgsType
  buttonText: string
  onSuccess: () => void
  proposalId: string
}
/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ExecuteManagement = ({
  functionName,
  args,
  proposalId,
  buttonText,
  onSuccess,
}: ExecuteManagementProps) => {
  const [isPending, setIsPending] = useState(false)

  return (
    <ContractButton handleClick={console.log} disabled={isPending}>
      {isPending ? <div>Pending...</div> : buttonText}
    </ContractButton>
  )
}

export default ExecuteManagement
