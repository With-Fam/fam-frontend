import { UserAvatar } from '@/components/shared'

const TopMembers = ({ members }: any) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex">
        {members.map((member: any, i: any) => (
          <div
            key={member.userAddress}
            className="relative rounded-full"
            style={{
              transform: `translateX(-${5 * i}px)`,
              zIndex: `${5 * i}`,
            }}
          >
            <UserAvatar address={member.userAddress} width={16} height={16} />
          </div>
        ))}
      </div>
      <p className="text-md -translate-x-3 font-abc text-grey">
        &nbsp;{members?.length} members
      </p>
    </div>
  )
}

export default TopMembers
