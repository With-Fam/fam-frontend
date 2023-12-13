// Components
import PointyTopIcon from '@/components/home/HeroIcons/PointyTopIcon'
import RoseIcon from '@/components/home/HeroIcons/RoseIcon'
import RoundTopIcon from '@/components/home/HeroIcons/RoundTopIcon'
import StarIcon from '@/components/home/HeroIcons/StarIcon'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const HeroIcons = (): JSX.Element => (
  <div className="flex h-full justify-center gap-x-8 pt-11 sm:pt-24">
    <RoseIcon />
    <PointyTopIcon />
    <StarIcon />
    <RoundTopIcon />
  </div>
)

export default HeroIcons
