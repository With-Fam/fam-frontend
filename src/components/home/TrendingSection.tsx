'use client'

// Framework
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// Third Parties
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

// Local Components
import TrendingCard from '@/stories/TrendingCard'
import Heading from '@/stories/Heading'
import Paragraph from '@/stories/Paragraph'
import Arrow from '@/components/icons/Arrow'
import ChevronDown from '@/components/icons/ChevronDown'

// Content
import TRENDING_DATA from '@/content/home/trendingSection'

// Types
interface NavigationProps {
  direction: string
  onClick: () => void
}

// Prep Component
const NavigationButton = ({ onClick, direction }: NavigationProps) => (
  <div
    className={`
    absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2
    transform cursor-pointer items-center justify-center rounded-full
    bg-grey-light
    ${direction === 'prev' ? '-scale-x-100' : 'scale-x-100'}
    ${direction === 'prev' ? '-left-10' : '-right-10'}`}
    aria-label={`${direction} slide`}
    onClick={onClick}
  >
    <Arrow />
  </div>
)

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const TrendingSection = () => {
  const [swiper, setSwiper] = useState<any>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1.3)
  const [loading, setLoading] = useState(true)
  const [hideNavigation, setHideNavigation] = useState(false)
  const slidesElement = useRef<HTMLDivElement>(null)
  const slideWidth = 240
  const maxSlidesShowing = 3

  useEffect(() => {
    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth
      if (slidesElement.current) {
        const containerWidth = slidesElement.current.offsetWidth
        let newSlidesPerView = containerWidth / slideWidth
        if (newSlidesPerView > maxSlidesShowing) {
          newSlidesPerView = maxSlidesShowing
        }
        setSlidesPerView(newSlidesPerView)
        setLoading(false)
      }

      if (screenWidth < 1000) {
        setHideNavigation(true)
      } else {
        setHideNavigation(false)
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
          onSlideChange={() => setActiveSlide(swiper.activeIndex)}
          onSwiper={(swiper) => {
            setSwiper(swiper)
          }}
        >
          {!loading &&
            TRENDING_DATA.map((data, index) => {
              const {
                image,
                title,
                value,
                users,
                userQuantity,
                imageAlt,
                href,
              } = data
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
      </div>
      {!hideNavigation &&
        activeSlide < TRENDING_DATA.length - maxSlidesShowing && (
          <NavigationButton
            onClick={() => swiper.slideNext()}
            direction="next"
          />
        )}
      {!hideNavigation && activeSlide > 0 && (
        <NavigationButton onClick={() => swiper.slidePrev()} direction="prev" />
      )}
    </section>
  )
}

export default TrendingSection
