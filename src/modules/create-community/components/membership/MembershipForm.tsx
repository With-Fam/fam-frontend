'use client'
import { Paragraph } from '@/stories'

// data
import { MembershipTypes } from '@/types/create-community'

// validation
import ContinueButton from '@/modules/ContinueButton'
import { FormProvider, useForm } from 'react-hook-form'
import {
  MembershipFormValues,
  membershipValidationSchema,
} from '@/modules/create-community/components/membership/MembershipForm.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import MembershipPrice from '@/modules/create-community/components/membership/MembershipPrice'
import MintPeriod from '@/modules/create-community/components/membership/MintPeriod'
import RevenueSplit from '@/modules/create-community/components/membership/RevenueSplit'
import {
  FounderFieldArray,
  initFounder,
} from '@/modules/create-community/components/membership/FoundersFieldArray'

type MembershipFormProps = {
  onSubmit: () => void
}
export type FormValues = {
  type: MembershipTypes
}

// Helpers
const DEFAULTS: MembershipFormValues = {
  membershipPrice: 0.01,
  mintPeriod: 5,
  revenueSplit: 1,
  founders: [initFounder],
}

export function MembershipForm({ onSubmit }: MembershipFormProps): JSX.Element {
  const methods = useForm<MembershipFormValues>({
    resolver: yupResolver(membershipValidationSchema) as any,
    defaultValues: {
      ...DEFAULTS,
    },
  })

  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paragraph as="p4" className="mt-6 text-left text-grey-dark">
          Set your membership price, revenue split adn add additional founders
        </Paragraph>
        <MembershipPrice />
        <MintPeriod />
        <RevenueSplit />
        <FounderFieldArray />
        <ContinueButton />
      </form>
    </FormProvider>
  )
}
