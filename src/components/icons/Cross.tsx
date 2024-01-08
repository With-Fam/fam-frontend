import type { SVGProps } from './types'

// Types
type CrossProps = {
  color?: string
} & SVGProps

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Cross = ({ color = '#ffffff', className }: CrossProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    className={className}
  >
    <path
      d="M16 6.66699V25.3334"
      stroke={color}
      strokeWidth="2.66663"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66797 16H25.3344"
      stroke={color}
      strokeWidth="2.66663"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Cross
