'use client'

import Member from '@/components/Pages/CommunityPage/MembersPage/Member'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import getUserAvatar from '@/lib/getUserAvatar'
import getUserEnsName from '@/lib/getUserEnsName'
import { useMemo } from 'react'

const MembersPage = (): JSX.Element => {
  const { members, avatars, hosts } = useCommunityProvider() as any
  const sortedMembers = useMemo(() => {
    if (!hosts) return []
    return members.sort((a: any, b: any) => {
      return hosts[b?.userAddress] - hosts[a?.userAddress]
    })
  }, [hosts])

  return (
    <section
      className="relative mx-auto max-w-[936px]
      px-4 pb-4 sm:pb-10"
    >
      {hosts &&
        avatars &&
        sortedMembers.map((member: any) => (
          <Member
            data={member}
            key={member.id}
            ensName={getUserEnsName(avatars, member.userAddress)}
            ensImage={getUserAvatar(avatars, member.userAddress)}
            isHost={hosts?.[`${member.userAddress.toLowerCase()}`]}
          />
        ))}
    </section>
  )
}

export default MembersPage
