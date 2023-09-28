'use client'

// Framework
import { useState, useEffect, useRef } from 'react'

// Third Parties
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

// Local Components
import { NavigationButton, ExploreAll } from '@/stories'
import DropCard from '@/components/community-profile/DropCard'

// Content
import { DROPS_DATA } from '@/content/community-profile'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RecentDrops = (): JSX.Element => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1.3)
  const slidesElement = useRef<HTMLDivElement>(null)
  const slideWidth = 240
  const maxSlidesShowing = 3
  const RECENT_DROPS_DATA = DROPS_DATA.slice(0, 4)

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
      className="relative mx-auto max-w-[936px]
      px-4 py-8 sm:py-12"
    >
      <ExploreAll href="/community-profile?type=drops">Recent Drops</ExploreAll>
      <div ref={slidesElement} className="mt-6 overflow-hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={slidesPerView}
          onSlideChange={() => setActiveSlide(swiper?.activeIndex ?? 0)}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {RECENT_DROPS_DATA.map((drop, index) => {
            return (
              <SwiperSlide key={index}>
                <DropCard drop={drop} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <NavigationButton
        onClick={() => swiper?.slideNext()}
        direction="next"
        className={
          activeSlide < RECENT_DROPS_DATA.length - maxSlidesShowing
            ? 'hidden'
            : ''
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

export default RecentDrops
