'use client'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Local Components
import { Paragraph } from '@/stories'

// Types
interface VoteButtonProps {
  count: number
  handleClick: () => void
  icon: JSX.Element
  textColor: string
  active: boolean
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VoteButton = ({
  count,
  handleClick,
  icon,
  textColor,
  active,
}: VoteButtonProps): JSX.Element => (
  <div
    className={`
      ${active ? 'cursor-pointer' : ''}
      relative z-0 h-6 w-6 rounded-full bg-background p-1
    `}
    onClick={handleClick}
  >
    <div
      className={twMerge(
        'absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background p-1 hover:opacity-0',
        !active && 'opacity-0'
      )}
    >
      {icon}
    </div>
    <Paragraph
      as="p5"
      className={twMerge(
        'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2',
        textColor
      )}
    >
      {count}
    </Paragraph>
  </div>
)

export default VoteButton
