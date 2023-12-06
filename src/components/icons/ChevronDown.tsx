import type { SVGProps } from './types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ChevronDown = ({
  className,
  stroke = '#F54D18',
}: SVGProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M9 18L15 12L9 6"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ChevronDown
