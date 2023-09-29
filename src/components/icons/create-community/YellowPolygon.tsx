// Types
interface YellowPolygonProps {
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const YellowPolygon = ({ className }: YellowPolygonProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <path
        d="M8 20.954L24.1906 6L40.3812 20.954V42.1032H8V20.954Z"
        fill="#F3D742"
      />
    </svg>
  )
}

export default YellowPolygon
