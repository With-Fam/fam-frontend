// Third Parties
import { usePrivy } from '@privy-io/react-auth'

// Local Components
import Paragraph from '@/stories/Paragraph'

// Helpers
import { useCheckAuth } from '@/hooks/useCheckAuth'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const NotLoggedItems = (): JSX.Element => {
  const { privyData: { login } } = useCheckAuth()
  return (
    <button onClick={login} className='pointer-events-auto'>
      <Paragraph
        className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
        as="p2"
      >
        Connect
      </Paragraph>
    </button>
  )
}

export default NotLoggedItems
