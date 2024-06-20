import useVetoProposal from '@/hooks/useVetoProposal'
import { useState } from 'react'

const VetoButton = ({ community, proposalId }: any) => {
  const { veto } = useVetoProposal()
  const [vetoed, setVetoed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const response = await veto(community, proposalId)
    const { error } = response as any
    if (!error) setVetoed(true)
    setLoading(false)
  }

  if (vetoed) return <div />

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
