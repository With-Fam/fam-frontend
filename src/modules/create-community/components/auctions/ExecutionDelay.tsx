'use client'

import { InputSlider } from '@/components/forms'
import { Controller, useFormContext } from 'react-hook-form'

const ExecutionDelay = (): JSX.Element => {
  const { control } = useFormContext()

  return (
    <div className="mt-6">
      <Controller
        name="executionDelay"
        control={control}
        render={({ field }) => (
          <InputSlider
            label="Execution Delay"
            value={field.value}
            onChange={field.onChange}
            min={0}
            max={100}
            suffix="hours"
          />
        )}
      />
    </div>
  )
}

export default ExecutionDelay
