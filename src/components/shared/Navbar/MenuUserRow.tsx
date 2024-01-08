'use client'

// Framework
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Third Parties
import { useEnsName } from 'wagmi'

// Local Components
import Paragraph from '@/stories/Paragraph'
import { ConfigIcon, Copy } from '@/components/icons'

// Types
import { Wallet } from '@privy-io/react-auth'
import { walletSnippet } from '@/utils/helpers'
type MenuUserRowProps = {
  wallet: Wallet
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const MenuUserRow = ({ wallet }: MenuUserRowProps): JSX.Element => {
  const { data: ensName } = useEnsName({
    address: wallet.address as `0x${string}`,
    chainId: 5,
  })
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
          <Image
            src="/assets/images/navbar/n1.jpeg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 overflow-hidden rounded-full object-cover"
          />
        </Link>
        <div className="ml-2 flex-1 flex flex-col justify-center">
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
