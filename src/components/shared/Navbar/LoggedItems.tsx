// Framework
import Link from 'next/link'
import Image from 'next/image'

// Local Components
import Paragraph from '@/stories/Paragraph'

// Types
interface NavProps {
  user: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const LoggedItems = ({ user }: NavProps): JSX.Element => {
  return (
    <>
      <Link href="/" passHref>
        <Paragraph
          className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
          as="p2"
        >
          Create
        </Paragraph>
      </Link>
      <Link href={user} aria-label="Go to user profile" passHref>
        <Image
          src="/assets/images/navbar/n1.jpeg"
          alt=""
          width={36}
          height={36}
          className="overflow-hidden rounded-full"
        />
      </Link>
    </>
  )
}

export default LoggedItems
