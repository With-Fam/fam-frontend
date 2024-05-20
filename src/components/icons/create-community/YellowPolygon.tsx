// Types
interface YellowPolygonProps {
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const YellowPolygon = ({ className }: YellowPolygonProps): JSX.Element => (
  <svg
<<<<<<< HEAD
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="64" height="64" rx="6" fill="#F54D18" />
    <path
      d="M16 28.954L32.1906 14L48.3812 28.954V50.1032H16V28.954Z"
      fill="#FFE500"
=======
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
>>>>>>> origin/main
    />
  </svg>
)

export default YellowPolygon
