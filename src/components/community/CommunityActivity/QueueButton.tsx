'use client'

// Framework
import { useState } from 'react'

// Third Parties
import { Address } from 'viem'
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

const QueueButton = ({
  functionName,
  args,
  proposalId,
  buttonText,
  onSuccess,
}: QueueButtonProps): JSX.Element => {
  const [isPending, setIsPending] = useState(false)

  return (
    <ContractButton handleClick={console.log} disabled={isPending}>
      {isPending ? <div>Pending...</div> : buttonText}
    </ContractButton>
  )
}

export default QueueButton
