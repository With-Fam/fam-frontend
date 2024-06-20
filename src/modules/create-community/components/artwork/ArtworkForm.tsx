'use client'
import { Controller, useForm } from 'react-hook-form'

import { useFormStore } from '@/modules/create-community/stores'
import schema, { type ArtworkFormValues } from './schema'
import { FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArtworkUpload } from './ArtworkUpload'
import { useCreateCommunityContext } from '@/contexts/create-community'
import ContinueButton from '@/components/ContinueButton'

export function Artwork(): JSX.Element {
  const { next } = useCreateCommunityContext()
  const { setUpArtwork } = useFormStore()
  const { artwork } = setUpArtwork
  const initialValues = {
    artwork: artwork ?? [],
  }
  const methods = useForm<ArtworkFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  const { control, handleSubmit, register } = methods

  // Use values or just the form store?
  const onSubmit = next

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          {...register('artwork')}
          control={control}
          render={({ field }) => (
            <ArtworkUpload
              onChange={(value) => {
                field.onChange(value)
              }}
              helperText="Upload custom artwork for your community. You can also create a randomly generated artwork for each membership by uploading a single folder with subfolders for each layer"
            />
          )}
        />
        <ContinueButton />
      </form>
    </FormProvider>
  )
}
