// Types

type RoundTopIconProps = {
  color?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RoundTopIcon = ({ color = '#8146FF' }: RoundTopIconProps): JSX.Element => (
  <svg
    className="h-16 w-16 sm:h-24 sm:w-24"
    xmlns="http://www.w3.org/2000/svg"
    width="67"
    height="99"
    viewBox="0 0 67 99"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M66.0642 33.5998C66.0642 15.4692 51.3736 0.771484 33.2517 0.771484C15.1298 0.771484 0.439209 15.4692 0.439209 33.5998V98.2715H66.0642V33.5998Z"
      fill={color}
    />
  </svg>
)

export default RoundTopIcon
