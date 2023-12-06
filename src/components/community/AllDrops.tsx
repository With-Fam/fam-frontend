// Local Components
import DropCard from '@/components/community/DropCard'

// Content
import { DROPS_DATA } from '@/content/community'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const AllDrops = (): JSX.Element => (
  <section className="mx-auto max-w-[936px] px-4">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {DROPS_DATA.map((drop, index) => {
        return <DropCard priority={true} key={index} drop={drop} />
      })}
    </div>
  </section>
)

export default AllDrops
