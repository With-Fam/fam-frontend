// Types
import { SVGAttributes } from 'react'
type StarIconProps = SVGAttributes<SVGSVGElement> & {
  color?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const StarIcon = ({
  color = '#477443',
  ..._props
}: StarIconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="121"
    height="120"
    viewBox="0 0 121 120"
    fill="none"
    {..._props}
  >
    <path
      d="M58.525 1.42237C58.7503 -0.474123 61.5022 -0.474123 61.7274 1.42237L63.6152 17.3322C66.0528 37.8761 82.2501 54.0734 102.794 56.511L118.704 58.3988C120.6 58.624 120.6 61.376 118.704 61.6012L102.794 63.489C82.2501 65.9266 66.0528 82.1239 63.6152 102.668L61.7274 118.577C61.5022 120.474 58.7503 120.474 58.525 118.577L56.6373 102.668C54.1997 82.1239 38.0023 65.9266 17.4584 63.489L1.54859 61.6012C-0.347902 61.376 -0.347902 58.624 1.54859 58.3988L17.4584 56.511C38.0023 54.0734 54.1997 37.8761 56.6373 17.3322L58.525 1.42237Z"
      fill={color}
    />
  </svg>
)

export default StarIcon
