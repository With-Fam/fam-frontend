<<<<<<< HEAD
'use client'

// Types
import type { SVGProps } from './types'
type CloseProps = {
  color?: string
} & SVGProps

=======
>>>>>>> origin/main
/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const Close = ({ color = '#A7A7A7', className }: CloseProps): JSX.Element => (
  <svg
=======
const Close = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
>>>>>>> origin/main
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
<<<<<<< HEAD
    className={className}
  >
    <path
      d="M18 6L6 18"
      stroke={color}
=======
  >
    <path
      d="M18 6L6 18"
      stroke="#A7A7A7"
>>>>>>> origin/main
      strokeWidth="1.96104"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
<<<<<<< HEAD
      stroke={color}
=======
      stroke="#A7A7A7"
>>>>>>> origin/main
      strokeWidth="1.96104"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Close
