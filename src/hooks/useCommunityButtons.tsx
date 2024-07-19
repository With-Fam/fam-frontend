import useIsHost from '@/hooks/useIsHost'
import { Address } from 'viem'
import useContributeParty from '@/hooks/useContributeParty'
import useCrowdfund, { CrowdfundLifecycle } from '@/hooks/useCrowdfund'
import { usePrivy } from '@privy-io/react-auth'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import useMembershipSale from '@/hooks/useMembershipSales'
import useBatchContributeParty from '@/hooks/useBatchContributeParty'

const useCommunityButtons = (community: Address) => {
  const {
    contribute,
    checkJoining,
    joined,
    loading: contributeLoading,
  } = useContributeParty()
  const { batchContribute, loading: batchContributeLoading } =
    useBatchContributeParty()
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

  const joinLoading = contributeLoading || batchContributeLoading
  const loading =
    contributeLoading ||
    hostLoading ||
    crowdfundLoading ||
    saleLoading ||
    batchContributeLoading

  const isNotFinalized = crowfundLifecyle !== CrowdfundLifecycle.Finalized

  const canCreateActivity =
    joined && !isNotFinalized && isAuthenticated && !loading && !activeSale

  const canFinalize =
    ((isNotFinalized && joined && !loading) || activeSale) && isHost

  const canJoin =
    (isNotFinalized || (!isNotFinalized && activeSale)) && !joined && !loading

  const handleJoin = async () => {
    if (activeSale) await batchContribute(membershipSale)
    else {
      await contribute()
      await checkJoining()
    }
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
