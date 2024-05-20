<<<<<<< HEAD
import type { SVGProps } from './types'

=======
>>>>>>> origin/main
/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const CheckMark = ({
  className,
  color = "#45D039",
  ..._props
}: SVGProps): JSX.Element => (
=======
const CheckMark = (): JSX.Element => (
>>>>>>> origin/main
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
<<<<<<< HEAD
    className={className}
    {..._props}
  >
    <path
      d="M13.8669 4L6.53353 11.3333L3.2002 8"
      stroke={color}
=======
  >
    <path
      d="M13.8669 4L6.53353 11.3333L3.2002 8"
      stroke="#45D039"
>>>>>>> origin/main
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CheckMark
