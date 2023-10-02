// Framework
import Link from 'next/link'

// Local Components
import { Paragraph, Heading } from '@/stories'
import { ChevronDown } from '@/components/icons'

// Type
import type { PropsWithChildren } from 'react'
interface ExploreAllProps extends PropsWithChildren {
  href: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const ExploreAll = ({ children, href }: ExploreAllProps): JSX.Element => (
  <div className="flex w-full items-center justify-between">
    <Heading as="h3" className="text-orange">
      {children}
    </Heading>
    <Paragraph as="p2" className="text-orange">
      <Link
        href={href}
        className="flex items-center"
        aria-label="explore all trending"
      >
        <span className="hidden sm:inline-block">Explore all</span>
        <ChevronDown className="ml-2" />
      </Link>
    </Paragraph>
  </div>
)

export default ExploreAll
