'use client'

// Framework
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// Third Parties
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperClass } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

// Local Components
import { Heading, Paragraph, TrendingCard } from '@/stories'
import { ChevronDown } from '@/components/icons'
import NavigationButton from './NavigationButton'

// Content
import TRENDING_DATA from '@/content/home/trendingSection'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

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
      <div className="flex w-full items-center justify-between">
        <Heading as="h3" className="mb-4 text-orange">
          Trending
        </Heading>
        <Paragraph as="p2" className="text-orange">
          <Link
            href="/"
            className="flex items-center"
            aria-label="explore all trending"
          >
            <span className="hidden sm:inline-block">Explore all</span>
            <ChevronDown className="ml-2" />
          </Link>
        </Paragraph>
      </div>
      <div ref={slidesElement} className="overflow-hidden">
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

export default TrendingSection
