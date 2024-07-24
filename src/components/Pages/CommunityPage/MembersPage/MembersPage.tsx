'use client'

import Member from '@/components/Pages/CommunityPage/MembersPage/Member'
import { useCommunityProvider } from '@/contexts/CommunityProvider'

const MembersPage = (): JSX.Element => {
  const { members, avatars } = useCommunityProvider() as any

  return (
    <section
      className="relative mx-auto max-w-[936px]
      px-4 pb-4 sm:pb-10"
    >
      {members &&
        avatars &&
        members.map((member: any) => (
          <Member
            data={member}
            key={member.id}
            ensName={
              avatars?.ensNames?.[`${member.userAddress}`] ||
              avatars?.openSeaNames?.[`${member.userAddress}`]
            }
            ensImage={avatars?.openSeaProfileImages?.[`${member.userAddress}`]}
          />
        ))}
    </section>
  )
}

export default MembersPage
