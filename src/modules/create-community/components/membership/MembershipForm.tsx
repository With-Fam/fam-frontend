'use client'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { twMerge } from 'tailwind-merge'

// Context
import { useCreateCommunityContext } from '@/contexts/create-community'

// Components
import { Paragraph } from '@/stories'

// data
import { MEMBERSHIP_DATA } from '@/content/create-community'
import { MembershipTypes } from '@/types/create-community'
import { zodResolver } from '@hookform/resolvers/zod'

// validation
import schema from './schema'
import ContinueButton from '@/modules/ContinueButton'

export type FormValues = {
  type: MembershipTypes
}

export function MembershipForm(): JSX.Element {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      type: 'daily',
    },
    resolver: zodResolver(schema),
  })
  const { next } = useCreateCommunityContext()
  const [selectedType, setSelectedType] = useState<FormValues['type']>('daily')

  const onSubmit = (values: FormValues): void => {
    console.log(values)
    next()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {MEMBERSHIP_DATA.map(({ description, market, title, type }) => (
              <div key={type} className="text-left">
                <div
                  className={twMerge(
                    'mb-2 cursor-pointer rounded-lg bg-white p-4',
                    'border border-solid border-white',
                    selectedType === type && 'border-orange'
                  )}
                  {...(type && {
                    onClick: () => {
                      field.onChange(type)
                      setSelectedType(type)
                    },
                  })}
                >
                  <Paragraph as="p3" className="mb-2">
                    {title}
                  </Paragraph>
                  <Paragraph as="p5" className="text-grey">
                    {description}
                  </Paragraph>
                </div>
                <div className="rounded-lg border border-solid border-grey-light bg-transparent p-4">
                  <Paragraph as="p5" className="text-grey">
                    {market}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
        )}
      />
      <ContinueButton />
    </form>
  )
}
