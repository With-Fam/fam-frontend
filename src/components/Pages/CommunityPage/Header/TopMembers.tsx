import MemberImage from '@/components/Pages/CommunityPage/MemberImage'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import getEnsPfpLink from '@/lib/getEnsPfpLink'

const TopMembers = ({ topMembers, membersNum }: any) => {
  const { avatars } = useCommunityProvider() as any

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex">
        {topMembers.map((member: any, i: any) => (
          <div
            key={member.userAddress}
            className="relative rounded-full"
            style={{
              transform: `translateX(-${5 * i}px)`,
              zIndex: `${5 * i}`,
            }}
          >
            <MemberImage
              address={member.userAddress}
              ensImage={
                getEnsPfpLink(avatars?.ensNames?.[`${member.userAddress}`]) ||
                avatars?.openSeaProfileImages?.[`${member.userAddress}`]
              }
            />
          </div>
        ))}
      </div>
      <p className="text-md -translate-x-3 font-abc text-grey">
        &nbsp;{membersNum} members
      </p>
    </div>
  )
}

export default TopMembers
