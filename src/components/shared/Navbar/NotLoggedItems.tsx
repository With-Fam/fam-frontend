import { usePrivy } from '@privy-io/react-auth'
import Paragraph from '@/stories/Paragraph'

const NotLoggedItems = (): JSX.Element => {
  const { login } = usePrivy()

  return (
    <button onClick={login} className="pointer-events-auto">
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
