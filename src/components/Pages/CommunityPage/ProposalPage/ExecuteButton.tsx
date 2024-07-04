'use client'

import useExecuteProposal from '@/hooks/useExecuteProposal'
import { useState } from 'react'
import { Address } from 'viem'

interface ExecuteButtonProps {
  proposal: any
  community: Address
  callback: any
}

const ExecuteButton = ({
  proposal,
  community,
  callback,
}: ExecuteButtonProps): JSX.Element => {
  const { execute } = useExecuteProposal()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await execute(proposal, community)
    callback()
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-full border bg-black px-6 py-3 text-[20px] text-white"
      disabled={loading}
    >
      {loading ? 'Finalizing...' : 'Finalize'}
    </button>
  )
}

export default ExecuteButton
