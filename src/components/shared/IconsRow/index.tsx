// Components
import { twMerge } from 'tailwind-merge'
import PointyTopIcon from './PointyTopIcon'
import RoseIcon from './RoseIcon'
import RoundTopIcon from './RoundTopIcon'
import StarIcon from './StarIcon'

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
