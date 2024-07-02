'use client'

import ActivityButton from '@/components/Pages/CommunityPage/Header/ActivityButton'
import TopMembers from '@/components/Pages/CommunityPage/Header/TopMembers'
import ShareButton from '@/components/Pages/CommunityPage/Header/ShareButton'
import Image from 'next/image'
import JoinButton from '@/components/Pages/CommunityPage/Header/JoinButton'
import useJoinParty from '@/hooks/useJoinParty'
import { useParams } from 'next/navigation'
import useCrowdfund, { CrowdfundLifecycle } from '@/hooks/useCrowdfund'
import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import { usePrivy } from '@privy-io/react-auth'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import FinalizeButton from '@/components/Pages/CommunityPage/Header/FinalizeButton'
import useIsHost from '@/hooks/useIsHost'
import { Address } from 'viem'

const Header = () => {
  const { community } = useParams()
  const { join, checkJoining, joined, loading: joinLoading } = useJoinParty()
  const { partyInfo, members } = useCommunityProvider() as any
  const {
    crowfundLifecyle,
    getCrowdfundLifeCyle,
    loading: crowdfundLoading,
  } = useCrowdfund(community)
  const { authenticated, ready } = usePrivy()
  const { connectedWallet } = useConnectedWallet()
  const isAuthenticated = authenticated && ready && connectedWallet
  const { isHost, loading: hostLoading } = useIsHost(
    community,
    connectedWallet as Address
  )

  const loading = joinLoading || hostLoading || crowdfundLoading
  const canActivity =
    joined &&
    crowfundLifecyle === CrowdfundLifecycle.Finalized &&
    isAuthenticated &&
    !loading
  const canFinalize =
    crowfundLifecyle !== CrowdfundLifecycle.Finalized &&
    isHost &&
    joined &&
    !loading
  const canJoin =
    crowfundLifecyle !== CrowdfundLifecycle.Finalized && !joined && !loading

  const onJoin = async () => {
    await join()
    await checkJoining()
  }

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
            <JoinButton onClick={onJoin}>
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
