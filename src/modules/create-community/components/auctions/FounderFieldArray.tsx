'use client'

// Packages
import { useFieldArray, useFormContext } from 'react-hook-form'

// Components
import { TextInput } from '@/components/forms'
import { Paragraph } from '@/stories'
import { Icon } from '@/components/Icon'
import { XMark } from '@/components/icons'

// Types
import type { TokenAllocation } from './AuctionForm.schema'
import { DateInput } from '@/components/forms/DateInput'
import { UpdateCommunityFormValues } from '@/modules/create-activity/components/update-community/UpdateCommunity.schema'

// Helpers
export const initFounder: TokenAllocation = {
  founderAddress: '',
  allocationPercentage: 0,
  endDate: '',
  admin: true,
}

export function FounderFieldArray(): JSX.Element {
  const { control } = useFormContext<UpdateCommunityFormValues>()
  const { fields, remove, append } = useFieldArray<UpdateCommunityFormValues>({
    control,
    name: 'founderAllocation',
  })

  return (
    <div className="space-y-2">
      <div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="relative z-0 mt-6">
              {index > 0 && (
                <div
                  className="absolute right-4 top-4 z-10 cursor-pointer"
                  onClick={() => {
                    remove(index)
                  }}
                >
                  <XMark color="#000" />
                </div>
              )}
              <TextInput
                name={`founderAllocation.${index}.founderAddress`}
                placeholder="Enter ENS or wallet address"
                label="Founder address"
              />
            </div>
            <div className="mt-4 flex gap-4">
              <div className="relative z-0 flex-1">
                <TextInput
                  name={`founderAllocation.${index}.allocationPercentage`}
                  type="number"
                  step="1"
                  placeholder="10"
                  label="Percentage"
                />
                <Paragraph
                  as="p3"
                  className="absolute bottom-4 right-4 z-10 -translate-y-1"
                >
                  %
                </Paragraph>
              </div>
              <div className="flex-1">
                <DateInput
                  name={`founderAllocation.${index}.endDate`}
                  placeholder="24-06-2023"
                  label="End date"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mx-auto my-4 flex flex-row items-center rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
        type="button"
        onClick={() => {
          append(initFounder)
        }}
      >
        <Icon id="plus" className="mr-2 h-6 w-6" />
        <span className="text-sm text-black">Add founder</span>
      </button>
    </div>
  )
}
