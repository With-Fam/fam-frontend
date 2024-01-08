'use client'

// Framework
import Link from 'next/link'
import { ReactNode } from 'react'

// Components
import { Paragraph } from '@/stories'

// Types
type MenuItemProps = {
  icon: ReactNode
  href?: string
  onClick?: () => void
  children: ReactNode
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const MenuItem = ({
  icon,
  href,
  children,
  onClick,
}: MenuItemProps): JSX.Element => (
  <li className="flex items-center gap-2">
    {icon}
    <Paragraph as="p2" className="leading-6 sm:leading-6">
      {href && (
        <Link className="block h-6" href={href}>
          {children}
        </Link>
      )}
      {!href && (
        <button className="block h-6" onClick={onClick}>
          {children}
        </button>
      )}
    </Paragraph>
  </li>
)

export default MenuItem
