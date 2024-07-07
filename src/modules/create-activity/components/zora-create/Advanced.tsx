import React, { useState } from 'react'
import { Icon } from '@/components/Icon'
import { useProposalStore } from '@/modules/create-activity/stores'
import EditionSize from '@/modules/create-activity/components/zora-create/EditionSize'
import { Controller } from 'react-hook-form'
import { InputSlider, TextInput } from '@/components/forms'
import _get from 'lodash.get'
import LimitPerAddress from '@/modules/create-activity/components/zora-create/LimitPerAddress'

const Advanced = ({ control }: any) => {
  const { showAdvancedOfZoraCreate, setShowAdvancedOfZoraCreate } =
    useProposalStore()
  const [duration, setDuration] = useState(7)
  return (
    <>
      <button
        type="button"
        className="mx-auto mt-4 flex items-center gap-1 rounded-full bg-orange-light px-3 py-2 text-orange"
        onClick={() => setShowAdvancedOfZoraCreate(!showAdvancedOfZoraCreate)}
      >
        Advanced
        {showAdvancedOfZoraCreate ? (
          <Icon id="chevronUp" fill={'#f54d18'} />
        ) : (
          <Icon id="chevronDown" fill={'#f54d18'} />
        )}
      </button>
      {showAdvancedOfZoraCreate && (
        <>
          <EditionSize />
          <section className="mt-4 rounded-md bg-white">
            <div className="flex items-center gap-1 px-4 pt-4 text-left font-abcMedium text-sm">
              Duration{' '}
            </div>
            <div className="flex w-full items-center justify-between pr-4">
              <div className="w-full">
                <Controller
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <InputSlider
                      label=""
                      value={field.value}
                      onChange={(value, index) => {
                        field.onChange(value, index)
                        setDuration(value)
                      }}
                      min={7}
                      max={90}
                      suffix=" days"
                    />
                  )}
                />
              </div>
            </div>
          </section>
          <LimitPerAddress duration={duration} />
          <TextInput
            name="payoutAddress"
            placeholder="Payout address"
            label="Payout address"
            className="mt-4"
          />
        </>
      )}
    </>
  )
}

export default Advanced
