<<<<<<< HEAD
// Third Parties
import { usePrivy } from '@privy-io/react-auth'
=======
// Framework
import Link from 'next/link'
>>>>>>> origin/main

// Local Components
import Paragraph from '@/stories/Paragraph'

<<<<<<< HEAD
// Helpers
import { useCheckAuth } from '@/hooks/useCheckAuth'

=======
>>>>>>> origin/main
/*--------------------------------------------------------------------*/

/**
 * Component
 */

const NotLoggedItems = (): JSX.Element => {
<<<<<<< HEAD
  const { privyData: { login } } = useCheckAuth()
  return (
    <button onClick={login} className='pointer-events-auto'>
=======
  return (
    <Link href="/" passHref>
>>>>>>> origin/main
      <Paragraph
        className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
        as="p2"
      >
        Connect
      </Paragraph>
<<<<<<< HEAD
    </button>
=======
    </Link>
>>>>>>> origin/main
  )
}

export default NotLoggedItems
