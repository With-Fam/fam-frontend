'use client'

import ActivityButton from '@/components/community/CommunityHeader/ActivityButton'
import TopMembers from '@/components/community/CommunityHeader/TopMembers'
import ShareButton from '@/components/community/CommunityHeader/ShareButton'
import Image from 'next/image'
import JoinButton from '@/components/community/CommunityHeader/JoinButton'
import useJoinParty from '@/hooks/useJoinParty'
import usePartyInfo from '@/hooks/usePartyInfo'
import { useParams } from 'next/navigation'
import useBalance from '@/hooks/useBalance'
import useCrowdfund, { CrowdfundLifecycle } from '@/hooks/useCrowdfund'
import getPartyDaoIpfsLink from '@/utils/getPartyDaoIpfsLink'
import { usePrivy } from '@privy-io/react-auth'
import useConnectedWallet from '@/hooks/useConnectedWallet'

const CommunityHeader = () => {
  const { community } = useParams()
  const { join, checkJoining, joined, loading } = useJoinParty()
  const { partyInfo, members } = usePartyInfo(community)
  const { balance } = useBalance()
  const { crowfundLifecyle } = useCrowdfund(community)
  const { authenticated, ready } = usePrivy()
  const { connectedWallet } = useConnectedWallet()
  const isAuthenticated = authenticated && ready && connectedWallet
  
  const shouldHide =
    balance <= 0 || crowfundLifecyle !== CrowdfundLifecycle.Active || !isAuthenticated

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
          <p className="text-md font-abc text-grey md:hidden">23,450 members</p>
        </div>
      </div>
      <div className="hidden w-full justify-between md:flex">
        <TopMembers members={members.slice(0, 3)} />
        <div className="flex items-center gap-2">
          <ShareButton />
          {!joined && !shouldHide && (
            <JoinButton onClick={onJoin}>
              {loading ? 'Joining...' : 'Join'}
            </JoinButton>
          )}
          <ActivityButton />
        </div>
      </div>
    </section>
  )
}

export default CommunityHeader
