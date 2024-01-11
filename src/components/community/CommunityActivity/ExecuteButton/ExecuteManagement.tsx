'use client'

// Framework
import { useState } from 'react'

// Third Parties
import { useSWRConfig } from 'swr'
import { waitForTransaction } from 'wagmi/actions'
import { type Address, useContractWrite, usePrepareContractWrite } from 'wagmi'

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
  const { addresses } = useDaoStore()
  const { mutate } = useSWRConfig()
  const chain = useChainStore((x) => x.chain)
  const [isPending, setIsPending] = useState(false)

  const { config, isError } = usePrepareContractWrite({
    enabled: !!addresses?.governor,
    address: addresses?.governor,
    abi: governorAbi,
    functionName: functionName,
    args: args,
  })

  const { writeAsync } = useContractWrite(config)

  const handleClick = async () => {
    if (!writeAsync) return

    try {
      setIsPending(true)
      const { hash } = await writeAsync?.()
      await waitForTransaction({ hash })

      await mutate(
        [SWR_KEYS.PROPOSAL, chain.id, proposalId],
        getProposal(chain.id, proposalId)
      )
      setIsPending(false)
      onSuccess()
    } catch (err) {
      setIsPending(false)
      console.log('err', err)
    }
  }

  return (
    <ContractButton handleClick={handleClick} disabled={isPending || isError}>
      {isPending ? <div>Pending...</div> : buttonText}
    </ContractButton>
  )
}

export default ExecuteManagement
