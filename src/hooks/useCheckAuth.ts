import { usePrivy } from '@privy-io/react-auth'
import { useAccount, useDisconnect } from 'wagmi'
type CheckAuthResponse = {
  isAuthenticated: boolean
  privyData: ReturnType<typeof usePrivy>
  wagmiData: ReturnType<typeof useAccount>
  logout: () => void
  walletExpired: boolean
}

export const useCheckAuth = (): CheckAuthResponse => {
  const privyData = usePrivy()
  const wagmiData = useAccount()
  const { disconnect } = useDisconnect()
  const isAuthenticated = privyData.authenticated && wagmiData.isConnected
  let walletExpired = false

  const logout = () => {
    if (privyData.authenticated) {
      privyData.logout()
    }
    if (wagmiData.isConnected) {
      disconnect()
    }
  }

  if (
    privyData.authenticated &&
    !wagmiData.isConnected &&
    wagmiData.status !== 'connecting'
  ) {
    walletExpired = true
  }

  return {
    isAuthenticated,
    logout,
    privyData,
    wagmiData,
    walletExpired,
  }
}
