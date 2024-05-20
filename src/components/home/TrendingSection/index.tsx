<<<<<<< HEAD
// Local Components
import { ExploreAll, TrendingCard } from '@/stories'

// Content
import TRENDING_DATA from '@/content/home/trendingSection'
import { SwiperSlider } from '@/components/shared'
=======
'use client'

// Framework
import { useState, useEffect, useRef } from 'react'

// Third Parties
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

// Local Components
import { ExploreAll, TrendingCard, NavigationButton } from '@/stories'

// Content
import TRENDING_DATA from '@/content/home/trendingSection'
>>>>>>> origin/main

/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
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
=======
const TrendingSection = (): JSX.Element => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1.3)
  const slidesElement = useRef<HTMLDivElement>(null)
  const slideWidth = 240
  const maxSlidesShowing = 3

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (slidesElement.current) {
        const containerWidth = slidesElement.current.offsetWidth
        let newSlidesPerView = containerWidth / slideWidth
        if (newSlidesPerView > maxSlidesShowing) {
          newSlidesPerView = maxSlidesShowing
        }
        setSlidesPerView(newSlidesPerView)
      }
    }

    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)

    return () => {
      window.removeEventListener('resize', updateSlidesPerView)
    }
  }, [])

  return (
    <section
      className="relative mx-auto max-w-[830px]
      px-4 py-12 sm:py-24"
    >
      <ExploreAll href="/explore">Trending</ExploreAll>
      <div ref={slidesElement} className="mt-4 overflow-hidden sm:mt-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={38}
          slidesPerView={slidesPerView}
          onSlideChange={() => setActiveSlide(swiper?.activeIndex ?? 0)}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {TRENDING_DATA.map((data, index) => {
            const { image, title, value, users, text, imageAlt, href } = data
            return (
              <SwiperSlide key={index}>
                <TrendingCard
                  image={image}
                  title={title}
                  value={value}
                  users={users}
                  text={text}
                  imageAlt={imageAlt}
                  href={href}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <NavigationButton
        onClick={() => swiper?.slideNext()}
        direction="next"
        className={
          activeSlide < TRENDING_DATA.length - maxSlidesShowing ? 'hidden' : ''
        }
      />
      <NavigationButton
        onClick={() => swiper?.slidePrev()}
        direction="prev"
        className={activeSlide > 0 ? 'hidden' : ''}
      />
    </section>
  )
}
>>>>>>> origin/main

export default TrendingSection
