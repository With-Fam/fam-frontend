import type { SVGProps } from './types'

const Plus = ({
  className,
  color = '#A7A7A7',
  ..._props
}: SVGProps): JSX.Element => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {..._props}
  >
    <path
      d="M8 3.33325V12.6666"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke={color}
    />
    <path
      d="M3.33398 8H12.6673"
      stroke={color}
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default Plus
