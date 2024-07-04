import useVetoProposal from '@/hooks/useVetoProposal'
import { useState } from 'react'

const VetoButton = ({ community, proposalId, callback }: any) => {
  const { veto } = useVetoProposal()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await veto(community, proposalId)
    callback()
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4 pt-12">
      <p className="text-grey">You can veto this activity</p>
      <button
        className="rounded-full bg-red px-4 py-2 text-white"
        onClick={handleClick}
      >
        {loading ? 'Loading...' : 'Veto'}
      </button>
    </div>
  )
}

export default VetoButton
