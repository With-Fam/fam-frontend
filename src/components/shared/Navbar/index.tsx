'use client'

// Framework
import { usePathname } from 'next/navigation'

// Third parties
import { usePrivy } from '@privy-io/react-auth'

// Local Components
import { Logo } from '@/components/shared'
import LoggedItems from '@/components/shared/Navbar/LoggedItems'
import NotLoggedItems from '@/components/shared/Navbar/NotLoggedItems'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Navbar = (): JSX.Element => {
  const { user } = usePrivy()
  const path = usePathname()
  const isHome = path === '/'

  return (
    <nav
      className={`fixed left-0 top-0 z-30 flex w-full justify-between p-4 sm:px-10 sm:py-8 ${
        isHome ? 'bg-orange' : 'bg-transparent'
      }`}
    >
      <Logo />
      <div className="flex items-center justify-end gap-3 h-12">
        {user ? <LoggedItems user={user} /> : <NotLoggedItems />}
      </div>
    </nav>
  )
}

export default Navbar
