// Framework
import Link from 'next/link'

// Local Components
import Paragraph from '@/stories/Paragraph'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const NotLoggedItems = (): JSX.Element => {
  return (
    <Link href="/" passHref>
      <Paragraph
        className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
        as="p2"
      >
        Connect
      </Paragraph>
    </Link>
  )
}

export default NotLoggedItems
