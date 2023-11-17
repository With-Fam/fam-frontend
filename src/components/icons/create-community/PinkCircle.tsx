// Types
interface PinkCircleProps {
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PinkCircle = ({ className }: PinkCircleProps): JSX.Element => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 6C0 2.68629 2.68629 0 6 0H58C61.3137 0 64 2.68629 64 6V58C64 61.3137 61.3137 64 58 64H6C2.68629 64 0 61.3137 0 58V6Z"
      fill="#FFE500"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 32C14 41.9411 22.0589 50 32 50C41.9411 50 50 41.9411 50 32C50 22.0589 41.9411 14 32 14C22.0589 14 14 22.0589 14 32ZM26.9901 32.0001C26.9901 34.7672 29.2333 37.0104 32.0004 37.0104C34.7675 37.0104 37.0107 34.7672 37.0107 32.0001C37.0107 29.2329 34.7676 26.9897 32.0004 26.9897C29.2333 26.9897 26.9901 29.2329 26.9901 32.0001Z"
      fill="#FDA4FF"
    />
  </svg>
)

export default PinkCircle
