<<<<<<< HEAD
'use client'

// Framework
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

// Third parties
import { twJoin } from 'tailwind-merge'

// Local Components
import { Logo } from '@/components/shared'
import LoggedItems from '@/components/shared/Navbar/LoggedItems'
import NotLoggedItems from '@/components/shared/Navbar/NotLoggedItems'

// Helpers
import { useCheckAuth } from '@/hooks/useCheckAuth'
=======
// Local Components
import { Logo } from '@/components/shared'
import LoggedItems from '@/components/shared/Navbar/LoggedItems'
//Hidden for now
// import NotLoggedItems from '@/components/shared/Navbar/NotLoggedItems'

// Types
interface NavProps {
  logged?: boolean
}
>>>>>>> origin/main

/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const Navbar = (): JSX.Element => {
  const {
    isAuthenticated,
    privyData: { ready },
  } = useCheckAuth()
  const path = usePathname()
  const isHome = path === '/'

  return (
    <nav
      className={twJoin(
        'pointer-events-none fixed left-0 top-0 z-30 flex w-full justify-between p-4 sm:px-10 sm:py-8',
        isHome ? 'bg-orange' : 'bg-transparent'
      )}
    >
      <Logo />
      <div className="flex h-12 items-center justify-end gap-3">
        {ready && (
          <Fragment>
            {isAuthenticated ? <LoggedItems /> : <NotLoggedItems />}
          </Fragment>
        )}
=======
const Navbar = ({ logged }: NavProps): JSX.Element => {
  return (
    <nav className="fixed left-0 top-0 flex w-full justify-between p-4 sm:px-10 sm:py-8">
      <Logo />
      <div className="flex items-center justify-end gap-3">
        {logged ? <LoggedItems user={'/'} /> : null}
>>>>>>> origin/main
      </div>
    </nav>
  )
}

export default Navbar
