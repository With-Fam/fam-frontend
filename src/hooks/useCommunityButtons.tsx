import useIsHost from '@/hooks/useIsHost'
import { Address } from 'viem'
import useJoinParty from '@/hooks/useJoinParty'
import useCrowdfund, { CrowdfundLifecycle } from '@/hooks/useCrowdfund'
import { usePrivy } from '@privy-io/react-auth'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import useMembershipSale from '@/hooks/useMembershipSales'

const useCommunityButtons = (community: Address) => {
  const {
    contribute,
    checkJoining,
    joined,
    loading: joinLoading,
  } = useJoinParty()

  const {
    getMembershipSale,
    activeSale,
    loading: saleLoading,
    membershipSale,
  } = useMembershipSale(community)
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

  const loading = joinLoading || hostLoading || crowdfundLoading || saleLoading
  const isNotFinalized = crowfundLifecyle !== CrowdfundLifecycle.Finalized

  const canCreateActivity =
    joined && !isNotFinalized && isAuthenticated && !loading && !activeSale

  const canFinalize =
    ((isNotFinalized && joined && !loading) || activeSale) && isHost

  const canJoin =
    (isNotFinalized || (!isNotFinalized && activeSale)) && !joined && !loading

  const handleJoin = async () => {
    await contribute(membershipSale)
    await checkJoining()
    await callback()
  }

  const callback = async () => {
    await getCrowdfundLifeCyle()
    await getMembershipSale()
  }

  return {
    handleJoin,
    canFinalize,
    canJoin,
    canCreateActivity,
    callback,
    joinLoading,
    activeSale,
    membershipSale,
  }
}

export default useCommunityButtons
