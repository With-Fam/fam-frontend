'use client'

// Third Parties
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Components
import { TextInput } from '@/components/forms'
import VetoManagement from './VetoManagement'
import { Paragraph } from '@/stories'
import PassThreshold from '@/modules/create-community/components/auctions/PassThreshold'
import ExecutionDelay from '@/modules/create-community/components/auctions/ExecutionDelay'
import ContinueButton from '../../../ContinueButton'
import { FounderFieldArray, initFounder } from './FounderFieldArray'
import { ErrorBox } from '@/components/shared'

// Types
import {
  type AuctionSettingsFormValues,
  auctionSettingsValidationSchema,
} from './AuctionForm.schema'

type AuctionsFormProps = {
  defaultValues: AuctionSettingsFormValues
  onSubmit: (_a: AuctionSettingsFormValues) => void
}

// Helpers
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
  proposalThreshold: 5,
  executionDelay: 24,
}

export function AuctionsForm({
  defaultValues,
  onSubmit,
}: AuctionsFormProps): JSX.Element {
  const methods = useForm<AuctionSettingsFormValues>({
    resolver: yupResolver(
      auctionSettingsValidationSchema(defaultValues.vetoerAddress as string)
    ) as any,
    defaultValues: {
      ...DEFAULTS,
      ...defaultValues,
    },
  })

  const { handleSubmit } = methods

  if (defaultValues.vetoerAddress === '0x') {
    return (
      <ErrorBox
        title="Error with your reload"
        description="Please, return to previous step."
      />
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 mt-6">
          <TextInput
            name="auctionReservePrice"
            type="number"
            step="0.01"
            label="Reserve price"
            placeholder="0.01 ETH"
          />
        </div>
        <Paragraph as="p4" className="text-left text-grey-dark">
          The founders can choose to receive a % of membership tokens until the
          specified end date. This ensures founders can have a greater influence
          when voting on community activities
        </Paragraph>

        <FounderFieldArray />
        <VetoManagement />
        <ExecutionDelay />
        <PassThreshold />
        <ContinueButton />
      </form>
    </FormProvider>
  )
}
