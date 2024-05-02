'use client'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useWallets } from '@privy-io/react-auth'
import { useChainId } from 'wagmi'

/*--------------------------------------------------------------------*/

/**
 * Page
 */
export default function Wallet(): JSX.Element {
  const { privyData } = useCheckAuth()
  const { login, ready, authenticated, logout } = privyData
  const number = useChainId()

  if (!ready) return <div>loading...</div>
  return (
    <div className="px-4">
      <div className="mt-24 flex flex-col items-center">
        {authenticated ? (
          <>
            <h2 onClick={() => logout()}>Logout</h2>
            <h2>Chain ID: {number}</h2>
          </>
        ) : (
          <h2 onClick={() => login()}>login</h2>
        )}
      </div>
    </div>
  )
}
