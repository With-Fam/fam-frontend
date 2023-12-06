'use client'

// Third Parties
import ReactSlider from 'react-slider'
import { Controller, useFormContext } from 'react-hook-form'

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

type InputSliderProps = {
  min?: number
  max?: number
  name: string
  step?: number
  value?: number
}

export const InputSlider = ({
  min = 0,
  max = 30,
  name,
  step = 1,
  value,
}: InputSliderProps): JSX.Element => {
  const { control } = useFormContext()
  return (
    <div className="flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black">
      <label className="mb-2 block font-abcMedium text-sm" htmlFor="duration">
        Duration
      </label>
      <div className="flex w-full gap-4">
        <Paragraph as="p3" className="whitespace-nowrap">
          {value} day{value && value > 1 ? 's' : ''}
        </Paragraph>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <ReactSlider
              min={min}
              max={max}
              step={step}
              value={field.value}
              renderThumb={Thumb}
              onChange={field.onChange}
              className="top-3 h-0.5 w-full cursor-pointer appearance-none bg-grey-light"
            />
          )}
        />
      </div>
    </div>
  )
}
