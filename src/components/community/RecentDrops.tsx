// Local Components
import { ExploreAll } from '@/stories'
import DropCard from '@/components/community/DropCard'
import { SwiperSlider } from '@/components/shared'

// Content
import { DROPS_DATA } from '@/content/community'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RecentDrops = (): JSX.Element => {
  const RECENT_DROPS_DATA = DROPS_DATA.slice(0, 4)

  return (
    <section
      className="relative mx-auto max-w-[936px]
      px-4 py-8 sm:py-12"
    >
      <ExploreAll href="/community/drops">Recent Drops</ExploreAll>
      <SwiperSlider>
        {RECENT_DROPS_DATA.map((drop, index) => {
          return <DropCard drop={drop} key={index} />
        })}
      </SwiperSlider>
    </section>
  )
}

export default RecentDrops
