import useFinalizeParty from '@/hooks/useFinalizeParty'
import { useParams } from 'next/navigation'
import { Address } from 'viem'

const FinalizeButton = ({
  callback = () => {},
  activeSale,
  membershipSale,
}: any) => {
  const { community } = useParams()
  const { finalize, loading, finalizeSale } = useFinalizeParty(
    community as Address
  )

  const onClick = async () => {
    if (activeSale) await finalizeSale(membershipSale.saleId)
    else await finalize()
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
