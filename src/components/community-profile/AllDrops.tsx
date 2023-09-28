// Local Components
import DropCard from '@/components/community-profile/DropCard'

// Content
import DROPS_DATA from '@/content/community-profile/drops'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const AllDrops = (): JSX.Element => {
  return (
    <section className="mx-auto max-w-[936px] px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DROPS_DATA.map((drop, index) => {
          return <DropCard priority={true} key={index} drop={drop} />
        })}
      </div>
    </section>
  )
}

export default AllDrops
