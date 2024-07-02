'use client'

import ActivityButton from '@/components/Pages/CommunityPage/Header/ActivityButton'
import TopMembers from '@/components/Pages/CommunityPage/Header/TopMembers'
import ShareButton from '@/components/Pages/CommunityPage/Header/ShareButton'
import Image from 'next/image'
import JoinButton from '@/components/Pages/CommunityPage/Header/JoinButton'
import { useParams } from 'next/navigation'
import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import FinalizeButton from '@/components/Pages/CommunityPage/Header/FinalizeButton'
import useCommunityButtons from '@/hooks/useCommunityButtons'
import { Address } from 'viem'

const Header = () => {
  const { community } = useParams()
  const { partyInfo, members } = useCommunityProvider() as any
  const {
    canActivity,
    canFinalize,
    canJoin,
    handleJoin,
    getCrowdfundLifeCyle,
    joinLoading,
  } = useCommunityButtons(community as Address)

  return (
    <section
      className="relative mx-auto max-w-[936px]
      space-y-6 px-4 pb-0 sm:pb-2"
    >
      <div className="flex items-center gap-3">
        {partyInfo?.image && (
          <Image
            src={getPartyDaoIpfsLink(partyInfo?.image)}
            alt=""
            width={64}
            height={64}
          />
        )}
        <div className="grow space-y-1">
          <p className="text-md font-abcWide md:text-2xl">
            {partyInfo?.name || ''}
          </p>
          <p className="md:text-md break-normal font-abcWide text-sm text-grey	">
            {partyInfo?.description || ''}
          </p>
          <div className="block md:hidden">
            <TopMembers members={members.slice(0, 3)} />
          </div>
        </div>
      </div>
      <div className="w-full justify-between md:flex">
        <div className="hidden md:block">
          <TopMembers members={members.slice(0, 3)} />
        </div>
        <div className="flex items-center gap-2">
          <ShareButton />
          {canJoin && (
            <JoinButton onClick={handleJoin}>
              {joinLoading ? 'Joining...' : 'Join'}
            </JoinButton>
          )}
          {canFinalize && <FinalizeButton callback={getCrowdfundLifeCyle} />}
          {!canActivity && <ActivityButton />}
        </div>
      </div>
    </section>
  )
}

export default Header
