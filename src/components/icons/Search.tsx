import type { SVGProps } from './types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Search = ({
  className,
  color = '#7A7A7A',
  ..._props
}: SVGProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {..._props}
  >
    <path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.9999 20.9999L16.6499 16.6499"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Search
