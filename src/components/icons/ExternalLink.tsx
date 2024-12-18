import type { SVGProps } from './types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ExternalLink = ({
  color = '#A7A7A7',
  className,
}: SVGProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M4.66699 11.3337L11.3337 4.66699"
      stroke={color}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66699 4.66699H11.3337V11.3337"
      stroke={color}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ExternalLink
