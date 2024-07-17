'use client'

import { CHAIN_ID } from '@/constants/defaultChains'
import { usePrivy } from '@privy-io/react-auth'

export default function Wallet(): JSX.Element {
  const { login, ready, authenticated, logout } = usePrivy()

  if (!ready) return <div>loading...</div>
  return (
    <div className="px-4">
      <div className="mt-24 flex flex-col items-center">
        {authenticated ? (
          <>
            <h2 onClick={() => logout()}>Logout</h2>
            <h2>Chain ID: {CHAIN_ID}</h2>
          </>
        ) : (
          <h2 onClick={() => login()}>login</h2>
        )}
      </div>
    </div>
  )
}
