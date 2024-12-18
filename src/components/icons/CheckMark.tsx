import type { SVGProps } from './types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CheckMark = ({
  className,
  color = '#45D039',
  ..._props
}: SVGProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    className={className}
    {..._props}
  >
    <path
      d="M13.8669 4L6.53353 11.3333L3.2002 8"
      stroke={color}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CheckMark
