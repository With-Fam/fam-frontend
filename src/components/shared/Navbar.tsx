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
    <nav className="fixed left-0 top-0 flex justify-between px-10 py-8">
      <Logo />
      <Link href="/">
        <Paragraph
          className="rounded-3xl bg-black px-6 py-2.5 text-white"
          as="p2"
        >
          Connect
        </Paragraph>
      </Link>
    </nav>
  )
}

export default Navbar
