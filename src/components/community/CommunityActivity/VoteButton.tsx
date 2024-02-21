// Framework
import Link from 'next/link'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Local Components
import { Paragraph } from '@/stories'

// Types
interface VoteButtonProps {
  count: number
  icon: JSX.Element
  textColor: string
  active: boolean
  title?: string | null
  voteType: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VoteButton = ({
  count,
  icon,
  textColor,
  active,
}: VoteButtonProps): JSX.Element => (
  <div
    className={twMerge(
      active ? 'cursor-pointer' : '',
      'relative z-0 h-6 w-6 rounded-full bg-background p-1'
    )}
  >
    <span
      className={twMerge(
        'absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background p-1 hover:opacity-0',
        !active && 'opacity-0'
      )}
    >
      {icon}
    </span>
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
