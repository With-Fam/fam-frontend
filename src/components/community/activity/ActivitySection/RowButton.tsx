'use client'

// Components
import { Button } from '@/components/shared'
import { Paragraph } from '@/stories'
import { twJoin } from 'tailwind-merge'

// Types
type RowButtonProps = {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RowButton = ({
  active,
  onClick,
  children,
}: RowButtonProps): JSX.Element => (
  <Button
    type="button"
    className={twJoin(
      'w-full rounded-2xl',
      active ? 'bg-orange' : 'bg-grey-light'
    )}
    onClick={onClick}
  >
    <Paragraph as="p3" className={twJoin(active ? 'text-white' : 'text-grey')}>
      {children}
    </Paragraph>
  </Button>
)

export default RowButton
