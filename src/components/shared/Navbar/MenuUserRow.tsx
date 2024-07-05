'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Paragraph from '@/stories/Paragraph'
import { Copy } from '@/components/icons'
import EnsAddress from '@/components/shared/EnsAddress'
import useEthBalance from '@/hooks/useEthBalance'
import WalletComponent from '@/components/shared/Navbar/WalletComponent'
import { Address } from 'viem'
import useConnectedWallet from '@/hooks/useConnectedWallet'

const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})
const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})

type MenuUserRowProps = {
  address: `0x${string}`
}

const MenuUserRow = ({ address }: MenuUserRowProps): JSX.Element => {
  const [copySuccess, setCopySuccess] = useState(false)
  const copiedTimeout = useRef<NodeJS.Timeout | null>(null)
  const { connectedWallet } = useConnectedWallet()
  const { ethBalance } = useEthBalance(connectedWallet as Address)

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(address)
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
    <div className="border-gray-light flex w-full justify-between rounded-xl border p-2">
      <div className="flex items-center gap-2">
        <Link href="/profile" passHref aria-label="go to profile page">
          <UserAvatar address={address} width={40} height={40} />
        </Link>
        <div className="ml-2 flex flex-1 flex-col justify-center">
          <Paragraph as="p4" className="font-abcMedium">
            <EnsAddress address={address} />
          </Paragraph>
          <Paragraph as="p5" className="flex font-abcMedium text-gray-500">
            <span className="mr-1.5">
              <UserName address={address as `0x${string}`} addressFallback />
            </span>
            <button onClick={handleCopyClick} aria-label="copy user name">
              <Copy color={copySuccess ? '#F54D18' : undefined} />
            </button>
          </Paragraph>
        </div>
      </div>
      {ethBalance && <WalletComponent userBalance={ethBalance} />}
    </div>
  )
}

export default MenuUserRow
