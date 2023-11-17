'use client'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import { useChainId } from 'wagmi'
/*--------------------------------------------------------------------*/

/**
 * Page
 */
export default function Wallet(): JSX.Element {
  const { login, ready, authenticated, logout } = usePrivy()
  const { wallets } = useWallets()
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi()
  const number = useChainId()

  if (!ready) return <div>loading...</div>
  return (
    <div className="px-4">
      <div className="mt-24 flex flex-col items-center">
        {authenticated ? (
          <>
            <h2 onClick={() => logout()}>Logout</h2>
            <h2>Active Wallet {activeWallet?.address}</h2>
            <h2>Chain ID: {number}</h2>
            <ul>
              {wallets.map((wallet) => (
                <li key={wallet.address}>
                  <button onClick={() => setActiveWallet(wallet)}>
                    Activate {wallet.address}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2 onClick={() => login()}>login</h2>
        )}
      </div>
    </div>
  )
}
