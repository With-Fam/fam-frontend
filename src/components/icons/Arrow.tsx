import type { SVGProps } from './types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Arrow = ({
  className,
  color = '#A7A7A7',
  ..._props
}: SVGProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {..._props}
  >
    <path
      d="M9 18L15 12L9 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Arrow
