'use client'

import type { SVGProps } from './types'

// Types
type CloseProps = {
  color?: string
} & SVGProps

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Close = ({ color = '#A7A7A7', className }: CloseProps): JSX.Element => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M18 6L6 18"
      stroke={color}
      strokeWidth="1.96104"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke={color}
      strokeWidth="1.96104"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Close
