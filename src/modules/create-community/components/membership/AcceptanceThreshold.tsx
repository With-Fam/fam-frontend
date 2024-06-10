import { Icon } from '@/components/Icon'
import { InputSlider } from '@/components/forms'
import { useFormStore } from '@/modules/create-community/stores'
import { Controller, useFormContext } from 'react-hook-form'
import Tooltip from '@/components/shared/Tooltip'
import { useState } from 'react'
import DifficultyPill from './DifficultyPill'

const AcceptanceThreshold = () => {
  const { control } = useFormContext()
  const { membership } = useFormStore()
  const [selectedThreshold, setSelectedThreshold] = useState(
    membership.threshold
  )

  return (
    <section className="mt-4 rounded-md bg-white">
      <div className="flex items-center gap-1 px-4 pt-4 text-left font-abcMedium text-sm">
        Acceptance threshold{' '}
        <Tooltip
          id={'revenue-split-tooltip'}
          message="This is the period between a vote passing and the action being completed onchain. This can be skipped if all founders accept"
          className="!z-[100]"
        >
          <Icon id="helpCircle" fill="#ffffff" />
        </Tooltip>
      </div>
      <div className="flex w-full items-center justify-between pr-4">
        <div className="w-full">
          <Controller
            name="threshold"
            control={control}
            render={({ field }) => (
              <InputSlider
                label=""
                value={field.value}
                onChange={(value, index) => {
                  field.onChange(value, index)
                  setSelectedThreshold(value)
                }}
                min={0}
                max={100}
                suffix="%"
              />
            )}
          />
        </div>
        <DifficultyPill threshold={selectedThreshold} />
      </div>
    </section>
  )
}

export default AcceptanceThreshold
