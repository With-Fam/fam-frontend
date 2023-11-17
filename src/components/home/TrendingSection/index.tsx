// Local Components
import { ExploreAll, TrendingCard } from '@/stories'

// Content
import TRENDING_DATA from '@/content/home/trendingSection'
import { SwiperSlider } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const TrendingSection = (): JSX.Element => (
  <section className="relative mx-auto max-w-[830px] px-4 py-12 sm:py-24">
    <ExploreAll href="/explore">Trending</ExploreAll>
    <SwiperSlider>
      {TRENDING_DATA.map((data, index) => {
        const { image, title, value, users, text, imageAlt, slug } = data
        return (
          <TrendingCard
            key={index}
            image={image}
            title={title}
            value={value}
            users={users}
            text={text}
            imageAlt={imageAlt}
            slug={slug}
          />
        )
      })}
    </SwiperSlider>
  </section>
)

export default TrendingSection
