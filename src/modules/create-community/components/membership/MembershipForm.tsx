'use client'
import { Paragraph } from '@/stories'

// data
import { MembershipTypes } from '@/types/create-community'

// validation
import ContinueButton from '@/modules/ContinueButton'
import { TextInput } from '@/components/forms'
import { FormProvider, useForm } from 'react-hook-form'
import { MembershipFormValues, membershipValidationSchema } from '@/modules/create-community/components/membership/MembershipForm.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import MembershipPrice from '@/modules/create-community/components/membership/MembershipPrice'

export type FormValues = {
  type: MembershipTypes
}

// Helpers
const DEFAULTS: MembershipFormValues = {
  membershipPrice: 0.01,
  mintPeriod: 5,
  revenueSplit: 1,
  founderAllocation: []
}

export function MembershipForm(): JSX.Element {
  const methods = useForm<MembershipFormValues>({
    resolver: yupResolver(
      membershipValidationSchema
    ) as any,
    defaultValues: {
      ...DEFAULTS,
    },
  })

  const { handleSubmit } = methods

  const onSubmit = () => {}

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paragraph as="p4" className="text-left text-grey-dark mt-6">
          Set your membership price, revenue split adn
          add additional founders
        </Paragraph>
        <MembershipPrice />
        <ContinueButton />
      </form>
    </FormProvider>
  )
}
