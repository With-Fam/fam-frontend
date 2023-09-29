// Framework
import Link from 'next/link'
import Image from 'next/image'

// Local Components
import { Logo } from '@/components/shared'
import Paragraph from '@/stories/Paragraph'

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
        {logged && (
          <Link href="/" passHref>
            <Paragraph
              className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
              as="p2"
            >
              Connect
            </Paragraph>
          </Link>
        )}
        {!logged && (
          <>
            <Link href="/" passHref>
              <Paragraph
                className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
                as="p2"
              >
                Create
              </Paragraph>
            </Link>
            <Link href="/" aria-label="Go to user profile" passHref>
              <Image
                src="/assets/images/navbar/n1.jpeg"
                alt=""
                width={36}
                height={36}
                className="overflow-hidden rounded-full"
              />
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
