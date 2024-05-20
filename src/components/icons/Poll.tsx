<<<<<<< HEAD
import type { SVGProps } from './types'

=======
>>>>>>> origin/main
/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const Poll = ({
  className,
  color = '#8146FF',
  ..._props
}: SVGProps): JSX.Element => (
=======
const Poll = (): JSX.Element => (
>>>>>>> origin/main
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
<<<<<<< HEAD
    className={className}
    {..._props}
=======
>>>>>>> origin/main
  >
    <g clipPath="url(#clip0_8_2121)">
      <path
        d="M11.8832 4.40918V11.4818H2.09033V4.40918"
<<<<<<< HEAD
        stroke={color}
=======
        stroke="#8146FF"
>>>>>>> origin/main
        strokeWidth="1.0881"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9713 1.68848H1.0022V4.40873H12.9713V1.68848Z"
<<<<<<< HEAD
        stroke={color}
=======
        stroke="#8146FF"
>>>>>>> origin/main
        strokeWidth="1.0881"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.89893 6.58496H8.07513"
<<<<<<< HEAD
        stroke={color}
=======
        stroke="#8146FF"
>>>>>>> origin/main
        strokeWidth="1.0881"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8_2121">
        <rect
          width="13.0572"
          height="13.0572"
          fill="white"
          transform="translate(0.458252 0.0566406)"
        />
      </clipPath>
    </defs>
  </svg>
)

export default Poll
