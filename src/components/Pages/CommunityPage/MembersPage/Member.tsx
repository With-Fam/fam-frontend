import Link from 'next/link'
import { useParams } from 'next/navigation'
import useIsHost from '@/hooks/useIsHost'
import { CHAIN_ID } from '@/constants/defaultChains'
import MemberImage from '@/components/Pages/CommunityPage/MembersPage/MemberImage'
import truncateAddress from '@/lib/truncateAddress'

const Member = ({ data, ensName, ensImage }: any) => {
  const { community } = useParams()
  const { isHost } = useIsHost(community, data.userAddress)

  return (
    <Link
      href={`/profile/${CHAIN_ID}/${data.userAddress}`}
      key={data.id}
      className="mb-2 block rounded-lg bg-white p-4 sm:flex sm:items-center sm:justify-between"
    >
      <div className="mb-4 flex items-center justify-start gap-2 sm:mb-0">
        <MemberImage address={data.userAddress} ensImage={ensImage} />
        <p className="font-abcMedium text-[20px]">
          {ensName || truncateAddress(data.userAddress)}
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
