'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  type AuctionSettingsFormValues,
  auctionSettingsValidationSchema,
} from './AuctionForm.schema'

// Components
import { TextInput } from '@/components/forms'
import VetoManagement from './VetoManagement'
import { Alert, Sliders } from '@/components/icons'
import { Paragraph } from '@/stories'
import ContinueButton from '../../../ContinueButton'
import { FounderFieldArray, initFounder } from './FounderFieldArray'
import { useAccount } from 'wagmi'

type AuctionsFormProps = {
  defaultValues?: AuctionSettingsFormValues
  onSubmit: (_a: AuctionSettingsFormValues) => void
}

const DEFAULTS: AuctionSettingsFormValues = {
  auctionDuration: {
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  auctionReservePrice: undefined,
  vetoPower: false,
  vetoerAddress: '',
  founderAllocation: [initFounder],
}

export function AuctionsForm({
  defaultValues,
  onSubmit,
}: AuctionsFormProps): JSX.Element {
  const { address } = useAccount()
  const methods = useForm<AuctionSettingsFormValues>({
    resolver: yupResolver(
      auctionSettingsValidationSchema(address as string)
    ) as any,
    defaultValues: {
      ...DEFAULTS,
      ...defaultValues,
    },
  })

  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 mt-6">
          <TextInput
            name="auctionReservePrice"
            type="number"
            step="0.01"
            label="Reserve price"
            placeholder="0.05 ETH"
          />
          <div className="absolute right-4 top-4 z-10 cursor-pointer">
            <Sliders />
          </div>
        </div>
        <div className="mb-6 mt-3 flex items-center gap-2 rounded-2xl border border-solid border-grey-light bg-transparent p-4">
          <Alert />
          <Paragraph as="p5" className="text-left text-xs text-grey">
            Auction proceeds go into a shared pool managed by the community.
            Includes a 2% platform fee
          </Paragraph>
        </div>
        <Paragraph as="p4" className="text-left text-grey-dark">
          The founders can choose to receive a % of membership tokens until the
          specified end date. This ensures founders can have a greater influence
          when voting on community activities
        </Paragraph>
        <FounderFieldArray />
        <VetoManagement />
        <ContinueButton />
      </form>
    </FormProvider>
  )
}
