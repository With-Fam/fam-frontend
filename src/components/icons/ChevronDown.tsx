<<<<<<< HEAD
import type { SVGProps } from './types'
=======
// Types
interface ChevronDownProps {
  className?: string
}
>>>>>>> origin/main

/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const ChevronDown = ({
  className,
  color = '#F54D18',
}: SVGProps): JSX.Element => (
  <svg
=======
const ChevronDown = ({ className }: ChevronDownProps): JSX.Element => (
  <svg
    className={className}
>>>>>>> origin/main
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
<<<<<<< HEAD
    className={className}
  >
    <path
      d="M9 18L15 12L9 6"
      stroke={color}
=======
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="#F54D18"
>>>>>>> origin/main
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ChevronDown
