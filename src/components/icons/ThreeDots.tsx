// Types
type ThreeDotsProps = {
  color?: string
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ThreeDots = ({
  color = '#A7A7A7',
  className,
}: ThreeDotsProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M7.9987 8.66634C8.36689 8.66634 8.66536 8.36786 8.66536 7.99967C8.66536 7.63148 8.36689 7.33301 7.9987 7.33301C7.63051 7.33301 7.33203 7.63148 7.33203 7.99967C7.33203 8.36786 7.63051 8.66634 7.9987 8.66634Z"
      stroke={color}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6667 8.66634C13.0349 8.66634 13.3333 8.36786 13.3333 7.99967C13.3333 7.63148 13.0349 7.33301 12.6667 7.33301C12.2985 7.33301 12 7.63148 12 7.99967C12 8.36786 12.2985 8.66634 12.6667 8.66634Z"
      stroke={color}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33464 8.66634C3.70283 8.66634 4.0013 8.36786 4.0013 7.99967C4.0013 7.63148 3.70283 7.33301 3.33464 7.33301C2.96645 7.33301 2.66797 7.63148 2.66797 7.99967C2.66797 8.36786 2.96645 8.66634 3.33464 8.66634Z"
      stroke={color}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ThreeDots
