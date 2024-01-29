'use client'

// Framework
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Local Components
import Paragraph from '@/stories/Paragraph'
import { ConfigIcon, Copy } from '@/components/icons'
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})
const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})

// Types
import { Wallet } from '@privy-io/react-auth'
type MenuUserRowProps = {
  wallet: Wallet
}

//Helpers
import { walletSnippet } from '@/utils/helpers'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const MenuUserRow = ({ wallet }: MenuUserRowProps): JSX.Element => {
  const [copySuccess, setCopySuccess] = useState(false)
  const copiedTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(wallet.address)
    setCopySuccess(true)

    copiedTimeout.current = setTimeout(() => {
      setCopySuccess(false)
    }, 500)
  }

  useEffect(() => {
    if (copiedTimeout.current) {
      clearTimeout(copiedTimeout.current)
    }
  }, [])

  return (
    <div className="flex w-full">
      <div className="flex w-full justify-between">
        <Link href="/profile" passHref aria-label="go to profile page">
          <UserAvatar address={wallet.address} width={40} height={40} />
        </Link>
        <div className="ml-2 flex flex-1 flex-col justify-center">
          <Paragraph as="p4" className="flex font-abcMedium font-bold">
            <span className="mr-1.5">
              <UserName
                address={wallet.address as `0x${string}`}
                addressFallback
              />
            </span>
            <button onClick={handleCopyClick} aria-label="copy user name">
              <Copy color={copySuccess ? '#F54D18' : undefined} />
            </button>
          </Paragraph>
          <Paragraph as="p5" className="text-gray-500">
            {walletSnippet(wallet.address)}
          </Paragraph>
        </div>
        {false /* as requested, implemented, but hidden for now */ && (
          <button aria-label="open config" className="h-min cursor-pointer">
            <ConfigIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default MenuUserRow
