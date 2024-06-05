'use client'

import _get from 'lodash.get'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { TextInput } from '@/components/forms'
import { Icon } from '@/components/Icon'
import { XMark } from '@/components/icons'
import ErrorMessage from '@/components/forms/ErrorMessage'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { useEffect } from 'react'

export interface TokenAllocation {
  founderAddress: string
}

export interface MembershipFoundersFormValues {
  founders: TokenAllocation[]
}

export const initFounder: TokenAllocation = {
  founderAddress: '',
}

export function FounderFieldArray(): JSX.Element {
  const { connectedWallet } = useConnectedWallet()
  const { control } = useFormContext<MembershipFoundersFormValues>()
  const { fields, remove, append, update } =
    useFieldArray<MembershipFoundersFormValues>({
      control,
      name: 'founders',
    })

  const handleAddFounder = () => {
    const newFounder = { ...initFounder }
    append(newFounder)
  }

  useEffect(() => {
    if (!connectedWallet) return
    update(0, { founderAddress: connectedWallet })
  }, [connectedWallet])

  return (
    <section className="mt-4 space-y-1 rounded-md bg-white py-4">
      <p className="block px-4 pt-4 text-left font-abcMedium text-sm">
        {`Founders(s)`}
      </p>
      <div className="pb-4">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="relative z-0">
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
                name={`founders.${index}.founderAddress`}
                placeholder="Enter ENS or wallet address"
                label=""
                containerClasses="!py-0"
              />
              <ErrorMessage name="founders.root" />
            </div>
          </div>
        ))}
      </div>
      <button
        className="mx-auto flex flex-row items-center rounded-full bg-grey-light px-3.5 py-2 font-abcMedium text-sm text-gray-900 shadow-sm hover:bg-gray-50"
        type="button"
        onClick={handleAddFounder}
      >
        <Icon id="plus" className="mr-2 h-6 w-6" />
        <span className="text-sm text-black">Add founder</span>
      </button>
    </section>
  )
}
