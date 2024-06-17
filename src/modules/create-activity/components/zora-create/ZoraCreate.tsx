'use client'

import { Controller, FormProvider } from 'react-hook-form'
import _get from 'lodash.get'
import { TextArea, TextInput } from '@/components/forms'
import { AddActionButton } from '../action'
import { ActionFormProps } from '@/modules/create-activity'
import { UploadIPFSImage } from '@/components/ipfs/UploadIPFSImage'
import Advanced from '@/modules/create-activity/components/zora-create/Advanced'
import useZoraCreateProposalForm from '@/hooks/useZoraCreateProposalForm'

export function ZoraCreate({
  callback,
}: Pick<ActionFormProps, 'callback'>): JSX.Element {
  const { methods, onSubmit } = useZoraCreateProposalForm(callback)
  const { handleSubmit, control } = methods

  return (
    <FormProvider {...methods}>
      <form
        id="__zora_collect"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mb-4 w-full max-w-[668px]"
      >
        <div className="flex flex-col gap-2">
          <Controller
            name="collectionImage"
            control={control}
            render={({ field }) => (
              <UploadIPFSImage
                name={field.name}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          <TextInput name="title" placeholder="Title" label="Title" />
          <TextArea
            name="description"
            label="Description"
            placeholder="Tell the world about your collection"
          />
          <TextInput
            name="pricePerEdition"
            type="number"
            step="0.0001"
            label="Price per edition"
            placeholder="0 ETH"
            min={0}
          />
        </div>
        <Advanced control={control} />
        <AddActionButton />
      </form>
    </FormProvider>
  )
}
