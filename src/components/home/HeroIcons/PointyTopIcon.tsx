// Types

import { SVGAttributes } from 'react'

type PointyTopIconProps = SVGAttributes<SVGSVGElement> & {
  color?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PointyTopIcon = ({
  color = '#FFE500',
  ..._props
}: PointyTopIconProps): JSX.Element => (
  <svg
    className="h-16 w-16 sm:h-24 sm:w-24"
    xmlns="http://www.w3.org/2000/svg"
    width="89"
    height="101"
    viewBox="0 0 89 101"
    fill="none"
    {..._props}
  >
    <path
      d="M0.687988 41.9328L44.7505 0.771484L88.813 41.9328V100.146H0.687988V41.9328Z"
      fill={color}
    />
  </svg>
)

export default PointyTopIcon
