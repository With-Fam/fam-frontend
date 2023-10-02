// Types
interface ChevronDownProps {
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ChevronDown = ({ className }: ChevronDownProps): JSX.Element => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="#F54D18"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ChevronDown
