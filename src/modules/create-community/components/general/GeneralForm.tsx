'use client'
// Forms
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import schema from './schema'

// Components
import { TextArea, TextInput } from '@/components/forms'
import ContinueButton from '../../../ContinueButton'
import { ImageUpload } from '@/components/shared'

export interface GeneralFormValues {
  daoAvatar: string
  daoDescription: string
  daoName: string
  daoSymbol: string
  daoWebsite: string
}

type GeneralFormProps = {
  defaultValues?: GeneralFormValues
  onSubmit: (a: GeneralFormValues) => void
}

export function GeneralForm({
  defaultValues = {
    daoName: '',
    daoAvatar: '',
    daoSymbol: '',
    daoWebsite: '',
    daoDescription: '',
  },
  onSubmit,
}: GeneralFormProps): JSX.Element {
  const methods = useForm<GeneralFormValues>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUpload formId="daoAvatar" />
        <div className="mt-6 flex flex-col gap-4">
          <TextInput
            name="daoName"
            placeholder="My community"
            label="Community"
          />
          <TextArea
            name="daoDescription"
            label="Description"
            placeholder="Tell the world about your project"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <TextInput
              name="daoSymbol"
              placeholder="$COMMUNITY"
              label="Symbol"
            />
            <TextInput
              name="daoWebsite"
              label="Website"
              placeholder="https://www.withfam.xyz"
            />
          </div>
        </div>
        <ContinueButton />
      </form>
    </FormProvider>
  )
}
