import type { SVGProps } from './types'
// Types
type EditPenProps = {
  color?: string
} & SVGProps

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const EditPen = ({
  color = '#A7A7A7',
  className,
}: EditPenProps): JSX.Element => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />

    <polygon
      fill="none"
      points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
)

export default EditPen
