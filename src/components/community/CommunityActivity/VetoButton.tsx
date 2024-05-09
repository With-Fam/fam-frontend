'use client'

import { Button } from '@/components/shared'
import useVetoProposal from '@/hooks/useVetoProposal'
import { Address } from 'viem'

interface VetoButtonProps {
  proposalId: bigint
  community: Address
}

const VetoButton = ({
  proposalId,
  community,
}: VetoButtonProps): JSX.Element => {
  const { veto } = useVetoProposal()

  const handleClick = async () => {
    await veto(community, proposalId)
  }

  return <Button onClick={handleClick}>Veto</Button>
}

export default VetoButton
