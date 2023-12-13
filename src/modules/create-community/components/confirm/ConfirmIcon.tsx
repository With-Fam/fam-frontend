import { twMerge } from 'tailwind-merge'

// Types
type ConfirmIconProps = {
  active: boolean
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ConfirmIcon = ({ active, className }: ConfirmIconProps): JSX.Element => (
  <span
    tabIndex={-1}
    className={twMerge('block h-6 w-6 rounded-lg bg-grey-light', className)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      {active && (
        <path
          d="M20 6L9 17L4 12"
          stroke="#F54D18"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  </span>
)

export default ConfirmIcon
