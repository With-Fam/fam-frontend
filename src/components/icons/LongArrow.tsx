import type { SVGProps } from './types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const LongArrow = ({
  className,
  color = '#A7A7A7',
  ..._props
}: SVGProps): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {..._props}
    >
      <path
        d="M19 12H5"
        stroke={color}
        strokeWidth="1.99993"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19L5 12L12 5"
        stroke={color}
        strokeWidth="1.99993"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default LongArrow
