<<<<<<< HEAD
'use client'
// Framework
import Link from 'next/link'
import { useNetwork, useSwitchNetwork } from 'wagmi'

// Local Components
import Paragraph from '@/stories/Paragraph'
import PopupMenu from '@/components/shared/Navbar/PopupMenu'
=======
// Framework
import Link from 'next/link'
import Image from 'next/image'

// Local Components
import Paragraph from '@/stories/Paragraph'

// Types
interface NavProps {
  user: string
}
>>>>>>> origin/main

/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const LoggedItems = (): JSX.Element => {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const switched = (net: number) => {
    switchNetwork?.(Number(net))
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  // if(error) return console.log('error', error)
  if (isLoading) return <>loading...</>

  // const { chains, switchNetwork } = useSwitchNetwork()

  return (
    <>
      <Link
        className="pointer-events-auto block h-12"
        href="/create-community"
        passHref
      >
=======
const LoggedItems = ({ user }: NavProps): JSX.Element => {
  return (
    <>
      <Link href="/" passHref>
>>>>>>> origin/main
        <Paragraph
          className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
          as="p2"
        >
          Create
        </Paragraph>
      </Link>
<<<<<<< HEAD
      <PopupMenu />
=======
      <Link href={user} aria-label="Go to user profile" passHref>
        <Image
          src="/assets/images/navbar/n1.jpeg"
          alt=""
          width={36}
          height={36}
          className="overflow-hidden rounded-full"
        />
      </Link>
>>>>>>> origin/main
    </>
  )
}

export default LoggedItems
