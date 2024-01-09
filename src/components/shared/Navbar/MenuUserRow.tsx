'use client'

// Framework
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Local Components
import Paragraph from '@/stories/Paragraph'
import { ConfigIcon, Copy } from '@/components/icons'
import { UserAvatar } from '@/components/shared'

// Types
import { Wallet } from '@privy-io/react-auth'
import { walletSnippet } from '@/utils/helpers'
type MenuUserRowProps = {
  wallet: Wallet
  ensName: string
  ensAvatar: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const MenuUserRow = ({
  wallet,
  ensName,
  ensAvatar,
}: MenuUserRowProps): JSX.Element => {
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
          <UserAvatar
            ensAvatar={ensAvatar}
            address={wallet.address}
            width={40}
            height={40}
          />
        </Link>
        <div className="ml-2 flex flex-1 flex-col justify-center">
          <Paragraph as="p4" className="flex font-abcMedium font-bold">
            <span className="mr-1.5">
              {ensName || walletSnippet(wallet.address)}
            </span>
            <button onClick={handleCopyClick} aria-label="copy user name">
              <Copy color={copySuccess ? '#F54D18' : undefined} />
            </button>
          </Paragraph>
          {ensName && (
            <Paragraph as="p5" className="text-gray-500">
              {walletSnippet(wallet.address)}
            </Paragraph>
          )}
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
