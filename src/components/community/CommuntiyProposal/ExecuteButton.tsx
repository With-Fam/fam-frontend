'use client'

import useExecuteProposal from '@/hooks/useExecuteProposal'
import { useState } from 'react'
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
  const [isExecuted, setIsExecuted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const response = await execute(proposal, community)
    const { error } = response as any
    if (!error) setIsExecuted(true)
    setLoading(false)
  }

  if (isExecuted) return <div />

  return (
    <button
      onClick={handleClick}
      className="rounded-full border px-4 py-1 text-green"
      disabled={loading}
    >
      {loading ? 'Executing...' : 'Execute'}
    </button>
  )
}

export default ExecuteButton
