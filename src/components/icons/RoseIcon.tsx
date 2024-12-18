// Types
import { SVGAttributes } from 'react'
type RoseIconProps = SVGAttributes<SVGSVGElement> & {
  color?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RoseIcon = ({
  color = '#FDA4FF',
  ..._props
}: RoseIconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="112"
    viewBox="0 0 100 112"
    fill="none"
    {..._props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M63.4458 31.544C92.1952 -1.97076 120.251 47.6033 77.3007 55.6328C120.251 64.0116 91.8488 113.236 63.4458 79.7213C77.9935 121.615 21.5341 121.266 36.082 79.7213C7.33265 113.236 -20.7239 64.0116 22.2269 55.6328C-21.0702 47.6033 7.33265 -1.62166 36.082 31.544C21.1877 -10.0003 77.9935 -10.0003 63.4458 31.544ZM49.5905 49.3488C53.0545 49.3488 56.1717 52.1418 56.1717 55.6328C56.1717 59.1239 53.0545 62.2661 49.5905 62.2661C46.1269 62.2661 43.3556 59.1239 43.3556 55.6328C43.3556 52.1418 46.1269 49.3488 49.5905 49.3488Z"
      fill={color}
    />
  </svg>
)

export default RoseIcon
