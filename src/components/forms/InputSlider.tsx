'use client'

// Third Parties
import ReactSlider, { ReactSliderProps } from 'react-slider'

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

type InputSliderProps = ReactSliderProps & {
  label: string
}

export function InputSlider({
  label,
  min = 0,
  max = 30,
  onChange,
  step = 1,
  value,
  ..._rest
}: InputSliderProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black">
      <label className="mb-2 block font-abcMedium text-sm" htmlFor="duration">
        {label}
      </label>
      <div className="flex w-full gap-4">
        <Paragraph as="p3" className="whitespace-nowrap">
          {value} day{value && value > 1 ? 's' : ''}
        </Paragraph>
        <ReactSlider
          min={min}
          max={max}
          step={step}
          value={value}
          renderThumb={Thumb}
          onChange={onChange}
          className="top-3 h-0.5 w-full cursor-pointer appearance-none bg-grey-light"
          {..._rest}
        />
      </div>
    </div>
  )
}
