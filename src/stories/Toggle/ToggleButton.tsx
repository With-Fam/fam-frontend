'use client'

// Framework
import { useRouter } from 'next/navigation'

// Third Parties
import { twMerge } from 'tailwind-merge'

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
      className={twMerge(
<<<<<<< HEAD
        'w-min rounded-3xl px-3 py-2 sm:px-4 whitespace-nowrap',
=======
        'w-min rounded-3xl px-3 py-2 sm:px-4',
>>>>>>> origin/main
        active ? 'bg-grey-light' : ''
      )}
      aria-label={`Toggle to ${children} type`}
      onClick={() => router.push(href)}
      type="button"
    >
      <Paragraph as="p4">{children}</Paragraph>
    </button>
  )
}
export default ToggleButton
