// Framework
import Link from 'next/link'

// Local Components
import Logo from '@/components/shared/Logo'
import Paragraph from '@/stories/Paragraph'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 flex justify-between p-4 sm:px-10 sm:py-8 w-full">
      <Logo />
      <Link href="/">
        <Paragraph
          className="rounded-3xl bg-black py-2 px-4 sm:px-6 sm:py-2.5 text-white"
          as="p2"
        >
          Connect
        </Paragraph>
      </Link>
    </nav>
  )
}

export default Navbar
