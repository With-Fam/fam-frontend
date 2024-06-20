'use client'

// Framework
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

// Third parties
import { useBalance } from 'wagmi'
import { motion } from 'framer-motion'

// Local Components
import MenuList from '@/components/shared/Navbar/MenuList'
import WalletComponent from '@/components/shared/Navbar/WalletComponent'
import MenuUserRow from '@/components/shared/Navbar/MenuUserRow'
import { Close } from '@/components/icons'
import { UserAvatar } from '@/components/shared'

// Helpers
import { formatCryptoVal } from '@/lib/numbers'
import { useCheckAuth } from '@/hooks/useCheckAuth'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PopupMenu = (): JSX.Element => {
  const {
    wagmiData: { address },
  } = useCheckAuth()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  })

  const userBalance = balance?.formatted
    ? `${Number(formatCryptoVal(balance?.formatted)).toFixed(2)} ETH`
    : undefined

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      setOpen(false)
      if (window.innerWidth <= 640) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    const handleClick = (e: MouseEvent) => {
      const el = popoverRef.current
      const isClickOutside = el && !el.contains(e.target as Node)
      if (isClickOutside) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('click', handleClick)
      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('click', handleClick)
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const variantsDesktop = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  }

  const variantsMobile = {
    open: { y: '0', opacity: 1, scale: 1 },
    closed: { y: '100%', opacity: 1, scale: 1 },
  }

  if (!address) return <></>

  return (
    <div className="pointer-events-auto relative h-12">
      <button onClick={() => setOpen(true)} aria-label="open users menu">
        <UserAvatar width={48} height={48} address={address as string} />
      </button>
      <motion.div
        initial="closed"
        animate={open ? 'open' : 'closed'}
        variants={isMobile ? variantsMobile : variantsDesktop}
        ref={popoverRef}
        className="fixed bottom-0 left-0 h-max w-full origin-top-right rounded-b-none rounded-t-3xl bg-white p-6 sm:absolute sm:bottom-auto sm:left-auto sm:right-0 sm:top-0 sm:w-[375px] sm:rounded-b-3xl"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="close users menu"
          className="absolute right-4 top-4 z-10"
        >
          <Close className="h-6 w-6" />
        </button>
        {address && <MenuUserRow address={address} />}
        {userBalance && <WalletComponent userBalance={userBalance} />}
        <MenuList address={address} />
      </motion.div>
    </div>
  )
}

export default PopupMenu
