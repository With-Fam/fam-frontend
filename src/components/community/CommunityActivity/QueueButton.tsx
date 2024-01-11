'use client'

// Framework
import { useState } from 'react'

// Third Parties
import { type Address, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useSWRConfig } from 'swr'
import { waitForTransaction } from 'wagmi/actions'

// Helpers
import { useChainStore } from '@/utils/stores/useChainStore'
import { useDaoStore } from '@/modules/dao'
import { governorAbi } from '@/data/contract/abis'
import SWR_KEYS from '@/constants/swrKeys'
import { getProposal } from '@/data/subgraph/requests/proposalQuery'

// Components
import ContractButton from '@/components/community/CommunityActivity/ContractButton'


// Types
type QueueButtonProps = {
  functionName: 'queue'
  args: [Address]
  buttonText: string
  onSuccess: () => void
  proposalId: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const QueueButton = ({
  functionName,
  args,
  proposalId,
  buttonText,
  onSuccess,
}: QueueButtonProps): JSX.Element => {
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

export default QueueButton
