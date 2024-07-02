import useIsHost from '@/hooks/useIsHost'
import { Address } from 'viem'
import useJoinParty from '@/hooks/useJoinParty'
import useCrowdfund, { CrowdfundLifecycle } from '@/hooks/useCrowdfund'
import { usePrivy } from '@privy-io/react-auth'
import useConnectedWallet from '@/hooks/useConnectedWallet'

const useCommunityButtons = (community: Address) => {
  const { join, checkJoining, joined, loading: joinLoading } = useJoinParty()
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

  const handleJoin = async () => {
    await join()
    await checkJoining()
  }

  return {
    handleJoin,
    canFinalize,
    canJoin,
    canActivity,
    getCrowdfundLifeCyle,
    joinLoading,
  }
}

export default useCommunityButtons
