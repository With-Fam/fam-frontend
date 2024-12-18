// Types
interface PurpleDotsProps {
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PurpleDots = ({ className }: PurpleDotsProps): JSX.Element => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="64" height="64" rx="6" fill="#FDA4FF" />
    <circle
      cx="31.9984"
      cy="20.6725"
      r="4.67251"
      transform="rotate(90 31.9984 20.6725)"
      fill="#8146FF"
    />
    <circle
      cx="20.6722"
      cy="26.3366"
      r="4.67251"
      transform="rotate(90 20.6722 26.3366)"
      fill="#8146FF"
    />
    <circle
      cx="43.3275"
      cy="26.3356"
      r="4.67251"
      transform="rotate(90 43.3275 26.3356)"
      fill="#8146FF"
    />
    <circle
      cx="31.9984"
      cy="32.0001"
      r="4.67251"
      transform="rotate(90 31.9984 32.0001)"
      fill="#8146FF"
    />
    <circle
      cx="20.6722"
      cy="37.6637"
      r="4.67251"
      transform="rotate(90 20.6722 37.6637)"
      fill="#8146FF"
    />
    <circle
      cx="43.3275"
      cy="37.663"
      r="4.67251"
      transform="rotate(90 43.3275 37.663)"
      fill="#8146FF"
    />
    <circle
      cx="31.9984"
      cy="43.3273"
      r="4.67251"
      transform="rotate(90 31.9984 43.3273)"
      fill="#8146FF"
    />
  </svg>
)

export default PurpleDots
