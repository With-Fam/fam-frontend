'use client'
import { Paragraph } from '@/stories'
import { MembershipTypes } from '@/types/create-community'
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
import { FounderFieldArray } from '@/modules/create-community/components/membership/FoundersFieldArray'

type MembershipFormProps = {
  defaultValues?: MembershipFormValues
  onSubmit: (_value: MembershipFormValues) => void
}
export type FormValues = {
  type: MembershipTypes
}

export function MembershipForm({
  defaultValues = {
    founders: [{ founderAddress: '' }],
    membershipPrice: 0.0001,
    mintPeriod: 5,
    revenueSplit: 30,
  },
  onSubmit,
}: MembershipFormProps): JSX.Element {
  const methods = useForm<MembershipFormValues>({
    resolver: yupResolver(membershipValidationSchema) as any,
    defaultValues,
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
