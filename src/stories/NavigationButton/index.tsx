// Local Components
import { Arrow } from '@/components/icons'
import { twMerge } from 'tailwind-merge'

// Types
interface NavigationProps {
  className?: string
  direction: string
  onClick: () => void
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const NavigationButton = ({
  className,
  onClick,
  direction,
}: NavigationProps): JSX.Element => (
  <div
    className={twMerge(
      `
    absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 transform
    cursor-pointer items-center justify-center rounded-full bg-grey-light
    lg:flex`,
<<<<<<< HEAD
      direction === 'prev' ? '-left-12 -scale-x-100' : '-right-12 scale-x-100',
=======
      direction === 'prev' ? '-left-10 -scale-x-100' : '-right-10 scale-x-100',
>>>>>>> origin/main
      className
    )}
    aria-label={`${direction} slide`}
    onClick={onClick}
  >
    <Arrow />
  </div>
)

export default NavigationButton
