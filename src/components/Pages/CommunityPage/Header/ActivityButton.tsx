import Plus from '@/components/icons/Plus'
import { useParams, useRouter } from 'next/navigation'

const ActivityButton = () => {
  const { push } = useRouter()
  const { network, community } = useParams()

  return (
    <button
      type="button"
      className="flex h-8 items-center gap-1 rounded-full bg-orange px-4 font-abc text-white"
      onClick={() => push(`/community/${network}/${community}/create-activity`)}
    >
      <Plus color="white" /> New Activity
    </button>
  )
}

export default ActivityButton
