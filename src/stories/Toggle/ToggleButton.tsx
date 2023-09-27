'use client'

// Framework
import { useRouter } from 'next/navigation'

// Local Components
import { Paragraph } from '@/stories'

// Types
interface ToggleButtonProps {
  active: boolean
  href: string
  children: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ToggleButton = ({
  href = 'trending',
  children,
  active,
}: ToggleButtonProps): JSX.Element => {
  const router = useRouter()
  return (
    <button
      className={`
          w-min rounded-3xl py-2 px-3 sm:px-4
          ${active ? 'bg-grey-light' : ''}
        `}
      aria-label={`Toggle comunnities to ${children} type`}
      onClick={() => router.push(href)}
      type="button"
    >
      <Paragraph as="p4">{children}</Paragraph>
    </button>
  )
}
export default ToggleButton
