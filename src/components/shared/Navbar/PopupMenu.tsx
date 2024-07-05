'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import MenuList from '@/components/shared/Navbar/MenuList'
import MenuUserRow from '@/components/shared/Navbar/MenuUserRow'
import { UserAvatar } from '@/components/shared'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { Address } from 'viem'

const PopupMenu = (): JSX.Element => {
  const { connectedWallet } = useConnectedWallet()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

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

  return (
    <div className="pointer-events-auto relative h-12">
      <button onClick={() => setOpen(true)} aria-label="open users menu">
        <UserAvatar
          width={48}
          height={48}
          address={connectedWallet as string}
        />
      </button>
      <motion.div
        initial="closed"
        animate={open ? 'open' : 'closed'}
        variants={isMobile ? variantsMobile : variantsDesktop}
        ref={popoverRef}
        className="border-gray-light fixed left-0 top-full h-max
        w-full rounded-3xl border-[1px]
        bg-white p-6 sm:absolute sm:bottom-auto sm:left-auto sm:right-0 sm:w-[375px]"
      >
        <MenuUserRow address={connectedWallet as Address} />
        <MenuList address={connectedWallet as Address} />
      </motion.div>
    </div>
  )
}

export default PopupMenu
