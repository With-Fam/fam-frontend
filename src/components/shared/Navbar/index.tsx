// Local Components
'use client'
import { usePrivy } from '@privy-io/react-auth'
import { Logo } from '@/components/shared'
import LoggedItems from '@/components/shared/Navbar/LoggedItems'
import NotLoggedItems from '@/components/shared/Navbar/NotLoggedItems'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Navbar = (): JSX.Element => {
  const { user } = usePrivy()
  return (
    <nav className="fixed left-0 top-0 z-30 flex w-full justify-between p-4 sm:px-10 sm:py-8">
      <Logo />
      <div className="flex items-center justify-end gap-3">
        {user ? <LoggedItems /> : <NotLoggedItems />}
      </div>
    </nav>
  )
}

export default Navbar
