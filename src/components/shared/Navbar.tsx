// Framework
import Link from 'next/link'

// Local Components
import { Logo } from '@/components/shared'
import Paragraph from '@/stories/Paragraph'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 flex w-full justify-between p-4 sm:px-10 sm:py-8">
      <Logo />
      <Link href="/">
        <Paragraph
          className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
          as="p2"
        >
          Connect
        </Paragraph>
      </Link>
    </nav>
  )
}

export default Navbar
