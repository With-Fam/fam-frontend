<<<<<<< HEAD
import type { SVGProps } from './types'

=======
>>>>>>> origin/main
/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const InfoMark = ({
  className,
  color = '#A7A7A7',
  ..._props
}: SVGProps): JSX.Element => (
=======
const InfoMark = (): JSX.Element => (
>>>>>>> origin/main
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
<<<<<<< HEAD
    className={className}
    {..._props}
=======
>>>>>>> origin/main
  >
    <g clipPath="url(#clip0_10_1210)">
      <path
        d="M8.00065 14.6663C11.6825 14.6663 14.6673 11.6816 14.6673 7.99967C14.6673 4.31778 11.6825 1.33301 8.00065 1.33301C4.31875 1.33301 1.33398 4.31778 1.33398 7.99967C1.33398 11.6816 4.31875 14.6663 8.00065 14.6663Z"
<<<<<<< HEAD
        stroke={color}
=======
        stroke="#A7A7A7"
>>>>>>> origin/main
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.6667V8"
<<<<<<< HEAD
        stroke={color}
=======
        stroke="#A7A7A7"
>>>>>>> origin/main
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.33301H8.0054"
<<<<<<< HEAD
        stroke={color}
=======
        stroke="#A7A7A7"
>>>>>>> origin/main
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_10_1210">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default InfoMark
