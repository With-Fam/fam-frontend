<<<<<<< HEAD
import type { SVGProps } from './types'

=======
>>>>>>> origin/main
/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const LinearGradient = ({
  className = 'h-auto w-full',
  ..._props
}: SVGProps): JSX.Element => (
=======
const LinearGradient = (): JSX.Element => (
>>>>>>> origin/main
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="942"
    height="34"
    viewBox="0 0 942 34"
    fill="none"
<<<<<<< HEAD
    className={className}
    {..._props}
=======
    className="h-auto w-full"
>>>>>>> origin/main
  >
    <path d="M0 0H942V34H0V0Z" fill="url(#paint0_linear_107_436)" />
    <defs>
      <linearGradient
        id="paint0_linear_107_436"
        x1="471"
        y1="0"
        x2="471"
        y2="34"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
    </defs>
  </svg>
)

export default LinearGradient
