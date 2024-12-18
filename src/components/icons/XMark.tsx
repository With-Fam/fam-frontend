import type { SVGProps } from './types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const XMark = ({
  className,
  color = '#FF0000',
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
      d="M12.8203 4L4.82031 12"
      stroke={color}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.82031 4L12.8203 12"
      stroke={color}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default XMark
