'use client'

import Link from 'next/link'
import Paragraph from '@/stories/Paragraph'
import PopupMenu from '@/components/shared/Navbar/PopupMenu'
import useConnectedWallet from '@/hooks/useConnectedWallet'

const LoggedItems = (): JSX.Element => {
  const { connectedWallet } = useConnectedWallet()
  return (
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
      {connectedWallet && <PopupMenu />}
    </>
  )
}

export default LoggedItems
