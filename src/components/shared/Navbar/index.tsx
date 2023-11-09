// Local Components
import { Logo } from '@/components/shared'
import LoggedItems from '@/components/shared/Navbar/LoggedItems'
//Hidden for now
// import NotLoggedItems from '@/components/shared/Navbar/NotLoggedItems'

// Types
interface NavProps {
  logged?: boolean
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Navbar = ({ logged }: NavProps): JSX.Element => {
  return (
    <nav className="fixed left-0 top-0 flex w-full justify-between p-4 sm:px-10 sm:py-8">
      <Logo />
      <div className="flex items-center justify-end gap-3">
        {logged ? <LoggedItems user={'/'} /> : null}
      </div>
    </nav>
  )
}

export default Navbar
