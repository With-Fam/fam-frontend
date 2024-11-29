import useIsHost from '@/hooks/useIsHost'
import { Address } from 'viem'
import useJoinParty from '@/hooks/useJoinParty'
import { usePrivy } from '@privy-io/react-auth'
import useConnectedWallet from '@/hooks/useConnectedWallet'

const useCommunityButtons = (community: Address) => {
  const { joined, loading: joinLoading } = useJoinParty()
  const { authenticated, ready } = usePrivy()
  const { connectedWallet } = useConnectedWallet()
  const isAuthenticated = authenticated && ready && connectedWallet
  const { loading: hostLoading } = useIsHost(
    community,
    connectedWallet as Address
  )
  const loading = joinLoading || hostLoading
  const canCreateActivity = joined && isAuthenticated && !loading

  return {
    canCreateActivity,
  }
}

export default useCommunityButtons
