// Third Parties
import { useAccount } from 'wagmi'

// Helpers
import { useIsContract } from './useIsContract'

// Types
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReadonlyURLSearchParams } from 'next/navigation'
type useBridgeModalReturnType = {
  canUserBridge: boolean
  openBridgeModal: () => void
  closeBridgeModal: () => void
}

export const useBridgeModal = (
  router: AppRouterInstance,
  pathname: string,
  searchParams: ReadonlyURLSearchParams
): useBridgeModalReturnType => {
  const { address } = useAccount()
  const { data: isContractWallet } = useIsContract({ address })
  const dynamicParams = new URLSearchParams(searchParams)

  const openBridgeModal = () => {
    dynamicParams.set('bridge', 'true')
    router.push(`${pathname}?${dynamicParams.toString()}`)
  }

  const closeBridgeModal = () => {
    dynamicParams.delete('bridge')
    router.push(`${pathname}?${dynamicParams.toString()}`)
  }

  return {
    canUserBridge: !isContractWallet,
    openBridgeModal,
    closeBridgeModal,
  }
}
