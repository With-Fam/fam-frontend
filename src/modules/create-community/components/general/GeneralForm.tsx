'use client'
// Forms
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  generalValidationSchema,
  GeneralFormValues,
} from './GeneralForm.schema'

// Components
import { TextArea, TextInput } from '@/components/forms'
import { UploadIPFSImage } from '@/components/ipfs/UploadIPFSImage'
import ContinueButton from '../../../ContinueButton'

type GeneralFormProps = {
  defaultValues?: GeneralFormValues
  onSubmit: (a: GeneralFormValues) => void
}

export function GeneralForm({
  defaultValues = {
    daoName: '',
    daoAvatar: undefined,
    daoSymbol: '',
    daoWebsite: undefined,
    projectDescription: '',
  },
  onSubmit,
}: GeneralFormProps): JSX.Element {
  const methods = useForm<GeneralFormValues>({
    defaultValues,
    resolver: yupResolver(generalValidationSchema) as any,
    mode: 'onBlur',
  })

  const { control, handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="daoAvatar"
          control={control}
          render={({ field }) => (
            <UploadIPFSImage
              name={field.name}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <div className="mt-6 flex flex-col gap-4">
          <TextInput
            name="daoName"
            placeholder="My community"
            label="Community"
          />
          <TextArea
            name="projectDescription"
            label="Description"
            placeholder="Tell the world about your project"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            {/** Thoughts on having a smart input like Nouns? */}
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
