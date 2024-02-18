// Framework
import Link from 'next/link'

// Local Components
import Paragraph from '@/stories/Paragraph'
import PopupMenu from '@/components/shared/Navbar/PopupMenu'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const LoggedItems = (): JSX.Element => (
  <>
    <Link
      className="pointer-events-auto block h-12"
      href="/create-community"
      passHref
    >
      <Paragraph
        className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
        as="p2"
      >
        Create
      </Paragraph>
    </Link>
    <PopupMenu />
  </>
)

export default LoggedItems
