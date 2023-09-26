// Local Components
import { Arrow } from '@/components/icons'

// Types
interface NavigationProps {
  direction: string
  onClick: () => void
}

// Prep Component
const NavigationButton = ({
  onClick,
  direction,
}: NavigationProps): JSX.Element => (
  <div
    className={`
    absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 transform
    cursor-pointer items-center justify-center rounded-full bg-grey-light
    lg:flex
    ${direction === 'prev' ? '-scale-x-100' : 'scale-x-100'}
    ${direction === 'prev' ? '-left-10' : '-right-10'}`}
    aria-label={`${direction} slide`}
    onClick={onClick}
  >
    <Arrow />
  </div>
)

export default NavigationButton
