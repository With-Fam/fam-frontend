'use client'

// Local Components
import { InputSlider } from '@/components/forms'
import { Controller, useFormContext } from 'react-hook-form'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PassThreshold = (): JSX.Element => {
  const { control } = useFormContext()

  return (
    <div className="mt-6">
      <Controller
        name="proposalThreshold"
        control={control}
        render={({ field }) => (
          <InputSlider
            label="Acceptance threshold"
            value={field.value}
            onChange={field.onChange}
            min={1}
            max={100}
            suffix="%"
            level={
              <div className="rounded-full  bg-green-200 px-4 py-2 text-status-green">
                Easy
              </div>
            }
          />
        )}
      />
    </div>
  )
}

export default PassThreshold
