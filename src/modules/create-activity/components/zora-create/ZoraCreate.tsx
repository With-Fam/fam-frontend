'use client'

import { Controller, FormProvider } from 'react-hook-form'
import _get from 'lodash.get'
import { TextArea, TextInput } from '@/components/forms'
import AddActionButton from '@/components/AddActionButton'
import Advanced from '@/modules/create-activity/components/zora-create/Advanced'
import useZoraCreateProposalForm from '@/hooks/useZoraCreateProposalForm'
import UploadMedia from '@/modules/create-activity/components/zora-create/UploadMedia'
import { useState } from 'react'
import UploadImage from '@/modules/create-activity/components/zora-create/UploadImage'
import { Paragraph } from '@/stories'
import Link from 'next/link'

export function ZoraCreate(): JSX.Element {
  const { methods, onSubmit } = useZoraCreateProposalForm()
  const { handleSubmit, control } = methods
  const [audioUploaded, setAudioUploaded] = useState(false)

  return (
    <FormProvider {...methods}>
      <form
        id="__zora_collect"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mb-4 w-full max-w-[668px]"
      >
        <div className="flex flex-col gap-2">
          <Controller
            name="ipfsMedia"
            control={control}
            render={({ field }) => (
              <UploadMedia
                name={field.name}
                onChange={field.onChange}
                value={field.value}
                callback={setAudioUploaded}
                isMedia={audioUploaded}
              />
            )}
          />
          {audioUploaded && (
            <Controller
              name="ipfsImage"
              control={control}
              render={({ field }) => (
                <UploadImage
                  name={field.name}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          )}
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
          <div className="w-full text-left">
            <Paragraph as="p4" className="text-grey">
              Set your price to 0 ETH to earn creator rewards on Zora.{' '}
              <Link
                href="https://support.zora.co/en/articles/1368641"
                className="underline"
                target="_blank"
              >
                Learn more
              </Link>
            </Paragraph>
          </div>
        </div>
        <Advanced control={control} />
        <AddActionButton />
      </form>
    </FormProvider>
  )
}
