import Link from 'next/link'
import dynamic from 'next/dynamic'
import EnsAddress from '@/components/shared/EnsAddress'
import { useParams } from 'next/navigation'
import useIsHost from '@/hooks/useIsHost'
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})

const Member = ({ data }: any) => {
  const { network, community } = useParams()
  const { isHost } = useIsHost(community, data.userAddress)

  return (
    <Link
      href={`/profile/${network}/${data.userAddress}`}
      key={data.id}
      className="mb-2 block rounded-lg bg-white p-4 sm:flex sm:items-center sm:justify-between"
    >
      <div className="mb-4 flex items-center justify-start gap-2 sm:mb-0">
        <UserAvatar width={32} height={32} address={data.userAddress} />
        <p className="font-abcMedium text-[20px]">
          <EnsAddress
            className="flex items-center gap-1"
            address={data.userAddress}
          />
        </p>
        {isHost && (
          <div className="rounded-full bg-orange-light px-3 py-1">
            <p className="text-orange">Host</p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default Member
