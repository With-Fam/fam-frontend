'use client'

// Framework
import { useRouter } from 'next/navigation'

// Local Components
import { Paragraph } from '@/stories'

// Types
interface FilterProps {
  active: boolean
  href: string
  children: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const FilterButton = ({
  href = 'trending',
  children,
  active,
}: FilterProps): JSX.Element => {
  const router = useRouter()
  return (
    <button
      className={`
          w-min rounded-3xl px-4 py-2
          ${active ? 'bg-grey-light' : ''}
        `}
      aria-label={`filter comunnities to ${children} type`}
      onClick={() => router.push(href)}
      type="button"
    >
      <Paragraph as="p4">{children}</Paragraph>
    </button>
  )
}
export default FilterButton
