'use client'

// Framework
import { useState, useEffect, useCallback } from 'react'

// Third Parties
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'

// Local Components
import TrendingCard from '@/stories/TrendingCard'

// Content
import TRENDING_DATA from '@/content/home/trendingSection'
import Heading from '@/stories/Heading'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const TrendingSection = () => {
  const [slidesPerView, setSlidesPerView] = useState(1.3)

  const updateSlidesPerView = useCallback(() => {
    const screenWidth = window.innerWidth

    if (screenWidth < 360) {
      setSlidesPerView(1.2)
    } else if (screenWidth < 400) {
      setSlidesPerView(1.3)
    } else if (screenWidth < 500) {
      setSlidesPerView(2)
    } else if (screenWidth < 768) {
      setSlidesPerView(1)
    } else {
      setSlidesPerView(3)
    }
  }, [])

  useEffect(() => {
    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)

    return () => {
      window.removeEventListener('resize', updateSlidesPerView)
    }
  }, [updateSlidesPerView])

  return (
    <section className="trending px-4 py-24">
      <Heading as="h2" className="mb-4 text-3xl text-orange">
        Trending
      </Heading>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={slidesPerView}
      >
        {TRENDING_DATA.map((data, index) => {
          const { image, title, value, users, userQuantity, imageAlt, href } =
            data
          return (
            <SwiperSlide key={index}>
              <TrendingCard
                image={image}
                title={title}
                value={value}
                users={users}
                userQuantity={userQuantity}
                imageAlt={imageAlt}
                href={href}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}

export default TrendingSection
