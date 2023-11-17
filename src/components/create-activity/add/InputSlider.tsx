'use client'

// Framework
import { useEffect, useState } from 'react'

// Third Parties
import ReactSlider from 'react-slider'
import { useFormContext } from 'react-hook-form'

// Types
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Paragraph } from '@/stories'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Thumb = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const { key, ..._rest } = props

  return (
    <div
      key={key}
      {..._rest}
      className="-top-2 h-4 w-4 rounded-full bg-orange outline-none"
    />
  )
}

const InputSlider = (): JSX.Element => {
  const { setValue } = useFormContext()
  const [sliderValue, setSliderValue] = useState(7)

  useEffect(() => {
    setValue('duration', sliderValue)
  }, [sliderValue])

  return (
    <div className="flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black">
      <label className="mb-2 block font-abcMedium text-sm" htmlFor="duration">
        Duration
      </label>
      <div className="flex w-full gap-4">
        <Paragraph as="p3" className="whitespace-nowrap">
          {sliderValue} day{sliderValue > 1 ? 's' : ''}
        </Paragraph>
        <ReactSlider
          min={1}
          max={30}
          step={1}
          value={sliderValue}
          renderThumb={Thumb}
          onChange={(value) => setSliderValue(value)}
          className="top-3 h-0.5 w-full cursor-pointer appearance-none bg-grey-light"
        />
      </div>
    </div>
  )
}

export default InputSlider
