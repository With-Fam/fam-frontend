import { Icon } from '@/components/Icon'
import { InputSlider } from '@/components/forms'
import { useFormStore } from '@/modules/create-community/stores'
import { Paragraph } from '@/stories'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Tooltip from '@/components/shared/Tooltip'

const RevenueSplit = () => {
  const { control } = useFormContext()
  const [selectedSplit, setSelectedSplit] = useState(0)
  const { membership } = useFormStore()

  useEffect(() => {
    setSelectedSplit(100 - membership.revenueSplit)
  }, [membership])

  return (
    <section className="mt-4 rounded-md bg-white">
      <div className="flex items-center gap-1 px-4 pt-4 text-left font-abcMedium text-sm">
        Revenue Split{' '}
        <Tooltip
          id={'revenue-split-tooltip'}
          message="Revenue from memberships will be split between the founder(s) and community pool. Includes a 5% platform fee"
        >
          <Icon id="helpCircle" fill="#ffffff" />
        </Tooltip>
      </div>
      <div className="flex justify-between px-4 pt-4">
        <div className="rounded-full border bg-grey-light px-3 py-1">
          <p className="text-[12px]">Founders</p>
        </div>
        <div className="rounded-full border bg-grey-light px-3 py-1">
          <p className="text-[12px]">Community</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between pr-4">
        <div className="w-full">
          <Controller
            name="revenueSplit"
            control={control}
            render={({ field }) => (
              <InputSlider
                label=""
                value={field.value}
                onChange={(value, index) => {
                  field.onChange(value, index)
                  setSelectedSplit(100 - value)
                }}
                min={0}
                max={30}
                suffix="%"
              />
            )}
          />
        </div>
        <Paragraph as="p3" className="whitespace-nowrap">
          {selectedSplit}%
        </Paragraph>
      </div>
    </section>
  )
}

export default RevenueSplit
