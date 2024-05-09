'use client'

import { CheckMark } from '@/components/icons'
import { Button } from '@/components/shared'
import useExecuteProposal from '@/hooks/useExecuteProposal'
import { Address } from 'viem'

interface ExecuteButtonProps {
  proposal: any
  community: Address
}

const ExecuteButton = ({
  proposal,
  community,
}: ExecuteButtonProps): JSX.Element => {
  const { execute } = useExecuteProposal()

  const handleClick = async () => {
    await execute(proposal, community)
  }

  return (
    <Button onClick={handleClick}>
      <CheckMark />
    </Button>
  )
}

export default ExecuteButton
