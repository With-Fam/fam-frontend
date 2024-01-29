// Framework
import Link from 'next/link'

// Local Components
import Paragraph from '@/stories/Paragraph'
import PopupMenu from '@/components/shared/Navbar/PopupMenu'

// Types
import { User } from '@privy-io/react-auth'
type LoggedItemsProps = {
  user: User
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const LoggedItems = ({ user }: LoggedItemsProps ): JSX.Element => (
  <>
    <Link className="block h-12" href="/create-community" passHref>
      <Paragraph
        className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
        as="p2"
      >
        Create
      </Paragraph>
    </Link>
    <PopupMenu user={user} />
  </>
)

export default LoggedItems
