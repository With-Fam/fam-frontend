'use client'

// Framework
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Local Components
import { Paragraph } from '@/stories'

// Types
export interface TabButtonProps {
  id: string
  label: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const TabButton = ({ id, label }: TabButtonProps): JSX.Element => {
  const pathname = usePathname()
  const params = useParams()

  let isActive = false

  switch (id) {
    case 'home':
      isActive = !(
        pathname.includes('drops') ||
        pathname.includes('members') ||
        pathname.includes('activity')
      )
      break
    default:
      isActive = pathname.includes(id)
      break
  }

  return (
    <Link
      href={`/community/${params.network}/${params.community}/${
        id === 'home' ? '' : id
      }`}
      className={twMerge(
        'w-min rounded-3xl px-3 py-2 sm:px-4',
        isActive ? 'bg-grey-light' : ''
      )}
      aria-label={`Toggle to ${label} type`}
      type="button"
    >
      <Paragraph as="p4">{label}</Paragraph>
    </Link>
  )
}

export default TabButton
