// Local Components
import {
  PinkCircle,
  PurpleDots,
  YellowPolygon,
} from '@/components/icons/create-community'

// Types
import { IconProps } from '@/types/create-community'
interface CommunityIconProps {
  className?: string
  icon: IconProps
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityIcon = ({
  icon,
  className,
}: CommunityIconProps): JSX.Element => {
  switch (icon) {
    case 'pink_circle':
      return <PinkCircle className={className} />
    case 'purple_dots':
      return <PurpleDots className={className} />
    case 'yellow_poly':
      return <YellowPolygon className={className} />
    default:
      return <div />
  }
}

export default CommunityIcon
