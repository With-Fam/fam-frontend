'use client'

import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { Logo } from '@/components/shared'
import LoggedItems from '@/components/shared/Navbar/LoggedItems'
import NotLoggedItems from '@/components/shared/Navbar/NotLoggedItems'
import { usePrivy } from '@privy-io/react-auth'
import useConnectedWallet from '@/hooks/useConnectedWallet'

const Navbar = (): JSX.Element => {
  const { authenticated, ready } = usePrivy()
  const { connectedWallet } = useConnectedWallet()
  const path = usePathname()
  const isHome = path === '/'

  return (
    <nav
      className={`pointer-events-none fixed left-0 top-0 z-30 flex w-full justify-between p-4 sm:px-10 sm:py-8
      ${isHome ? 'bg-transparent md:bg-orange' : 'border-[1px] border-grey-light bg-background md:border-none md:bg-transparent'}`}
    >
      <Logo />
      <div className="flex h-12 items-center justify-end gap-3">
        {ready && (
          <Fragment>
            {authenticated && connectedWallet ? (
              <LoggedItems />
            ) : (
              <NotLoggedItems />
            )}
          </Fragment>
        )}
      </div>
    </nav>
  )
}

export default Navbar
