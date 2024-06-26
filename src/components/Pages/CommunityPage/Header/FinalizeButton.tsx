import useFinalizeParty from '@/hooks/useFinalizeParty'
import { useParams } from 'next/navigation'
import { Address } from 'viem'

const FinalizeButton = ({ callback = () => {} }) => {
  const { community } = useParams()
  const { finalize, loading } = useFinalizeParty(community as Address)

  const onClick = async () => {
    await finalize()
    callback()
  }

  return (
    <button
      type="button"
      className="flex h-8 items-center gap-1 rounded-full bg-orange px-4 font-abc text-white"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Finalizing...' : 'Finalize'}
    </button>
  )
}

export default FinalizeButton
