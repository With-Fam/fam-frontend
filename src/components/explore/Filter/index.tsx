'use client'

// Local Components
import FilterButton from '@/components/explore/Filter/FilterButton'

// Types
interface FilterProps {
  type: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Filter = ({ type = 'trending' }: FilterProps): JSX.Element => {
  return (
    <section className="block bg-background px-4 my-4 sm:my-10 mx-auto w-max">
      <FilterButton href="/explore?type=trending" active={type === 'trending'}>
        Trending
      </FilterButton>
      <FilterButton href="/explore?type=new" active={type === 'new'}>
        New
      </FilterButton>
    </section>
  )
}
export default Filter
