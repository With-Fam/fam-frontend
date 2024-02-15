// Components
import {
  RoseIcon,
  PointyTopIcon,
  StarIcon,
  RoundTopIcon,
} from '@/components/icons'
import { twMerge } from 'tailwind-merge'

// Types
type IconsRowProps = {
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const IconsRow = ({ className }: IconsRowProps): JSX.Element => (
  <div className={twMerge('flex h-full justify-center gap-x-8', className)}>
    <RoseIcon />
    <PointyTopIcon />
    <StarIcon />
    <RoundTopIcon />
  </div>
)

export default IconsRow
