<<<<<<< HEAD
import type { SVGProps } from './types'

=======
>>>>>>> origin/main
/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const Arrow = ({
  className,
  color = "#A7A7A7",
  ..._props
}: SVGProps): JSX.Element => (
=======
const Arrow = (): JSX.Element => (
>>>>>>> origin/main
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
<<<<<<< HEAD
    className={className}
    {..._props}
  >
    <path
      d="M9 18L15 12L9 6"
      stroke={color}
=======
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="#A7A7A7"
>>>>>>> origin/main
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Arrow
