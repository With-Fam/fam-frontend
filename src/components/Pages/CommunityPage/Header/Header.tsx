'use client'

import ActivityButton from '@/components/Pages/CommunityPage/Header/ActivityButton'
import TopMembers from '@/components/Pages/CommunityPage/Header/TopMembers'
import ShareButton from '@/components/Pages/CommunityPage/Header/ShareButton'
import Image from 'next/image'
import JoinButton from '@/components/Pages/CommunityPage/Header/JoinButton'
import { useParams } from 'next/navigation'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import FinalizeButton from '@/components/Pages/CommunityPage/Header/FinalizeButton'
import useCommunityButtons from '@/hooks/useCommunityButtons'
import { Address } from 'viem'
import { ipfsGatewayUrl } from '@/lib/ipfs-service'
import PartyImage from '@/components/Pages/PartyImage'

const Header = () => {
  const { community } = useParams()
  const { partyInfo, members } = useCommunityProvider() as any
  const {
    canCreateActivity,
    canFinalize,
    canJoin,
    handleJoin,
    callback,
    joinLoading,
    activeSale,
    membershipSale,
  } = useCommunityButtons(community as Address)

  return (
    <section
      className="relative space-y-6 px-4
      pb-0 sm:pb-2 md:mx-auto md:max-w-[936px]"
    >
      <div className="flex items-center gap-3">
        {partyInfo?.image && <PartyImage imageUrl={partyInfo?.image} />}
        <div className="grow space-y-1">
          <p className="text-md font-abcWide md:text-2xl">
            {partyInfo?.name || ''}
          </p>
          <div className="block md:hidden">
            <TopMembers
              topMembers={members.slice(0, 3)}
              membersNum={members.length}
            />
          </div>
        </div>
      </div>
      <div className="w-full justify-between md:flex">
        <div className="hidden md:block">
          <TopMembers
            topMembers={members.slice(0, 3)}
            membersNum={members.length}
          />
        </div>
        <div className="flex items-center gap-2">
          <ShareButton />
          {canJoin && (
            <JoinButton onClick={handleJoin}>
              {joinLoading ? 'Joining...' : 'Join'}
            </JoinButton>
          )}
          {canFinalize && (
            <FinalizeButton
              callback={callback}
              activeSale={activeSale}
              membershipSale={membershipSale}
            />
          )}
          {canCreateActivity && <ActivityButton />}
        </div>
      </div>
    </section>
  )
}

export default Header
