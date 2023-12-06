'use client'

// Framework
import { useState, useEffect, useRef, ReactNode } from 'react'

// Third Parties
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

// Local Components
import { NavigationButton } from '@/stories'

// Types
type SwiperSliderProps = {
  children: ReactNode[]
  navigation?: boolean
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const SwiperSlider = ({
  children,
  navigation = true,
}: SwiperSliderProps): JSX.Element => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1.3)
  const slidesElement = useRef<HTMLDivElement>(null)
  const slideWidth = 256
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
    <div className="relative z-0">
      <div ref={slidesElement} className="mt-4 overflow-hidden sm:mt-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={slidesPerView}
          onSlideChange={() => setActiveSlide(swiper?.activeIndex ?? 0)}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {children.map((item, index) => {
            return <SwiperSlide key={index}>{item}</SwiperSlide>
          })}
        </Swiper>
      </div>
      {navigation && (
        <>
          <NavigationButton
            onClick={() => swiper?.slideNext()}
            direction="next"
            className={
              activeSlide < children.length - maxSlidesShowing ? 'hidden' : ''
            }
          />
          <NavigationButton
            onClick={() => swiper?.slidePrev()}
            direction="prev"
            className={activeSlide > 0 ? 'hidden' : ''}
          />
        </>
      )}
    </div>
  )
}

export default SwiperSlider
