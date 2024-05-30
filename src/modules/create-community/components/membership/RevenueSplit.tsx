import { InputSlider } from '@/components/forms'
import { Paragraph } from '@/stories'
import { Controller, useFormContext } from 'react-hook-form'

const RevenueSplit = () => {
  const { control } = useFormContext()

  return (
    <section className="mt-4 rounded-md bg-white">
      <p className="block px-4 pt-4 text-left font-abcMedium text-sm">
        Revenue Split
      </p>
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
                onChange={field.onChange}
                min={30}
                max={70}
                suffix="%"
              />
            )}
          />
        </div>
        <Paragraph as="p3" className="whitespace-nowrap">
          70%
        </Paragraph>
      </div>
    </section>
  )
}

export default RevenueSplit
