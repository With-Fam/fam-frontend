'use client'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Local Components
import { Paragraph } from '@/stories'

// Types
interface VetoButtonProps {
  active: boolean
  onClick: () => void
  children: string
}

// Content

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VetoButton = ({
  active,
  onClick,
  children,
}: VetoButtonProps): JSX.Element => (
  <button
    onClick={onClick}
    type="button"
    className={twMerge(
      'flex-1 rounded-2xl p-6',
      active ? 'bg-orange text-white' : 'bg-grey-light text-grey'
    )}
  >
    <Paragraph as="p3">{children}</Paragraph>
  </button>
)

export default VetoButton
