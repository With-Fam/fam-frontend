// Types
import type { PropsWithChildren } from 'react'
interface LinkProps extends PropsWithChildren {
  href: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CustomLink = ({ href, children }: LinkProps): JSX.Element => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

export default CustomLink
