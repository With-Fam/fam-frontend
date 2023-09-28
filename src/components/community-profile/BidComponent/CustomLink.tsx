// Types
interface LinkProps {
  href: string
  children: React.ReactNode
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CustomLink = ({ href, children }: LinkProps): JSX.Element => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default CustomLink
