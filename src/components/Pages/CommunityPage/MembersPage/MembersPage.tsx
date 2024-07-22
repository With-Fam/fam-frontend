'use client'

import Member from '@/components/Pages/CommunityPage/MembersPage/Member'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import useAvatars from '@/hooks/useAvatars'

const MembersPage = (): JSX.Element => {
  const { members } = useCommunityProvider() as any
  const { avatars } = useAvatars(members) as any

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
