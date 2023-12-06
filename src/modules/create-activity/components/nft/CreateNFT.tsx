'use client'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema, { CreateNFTFormValues } from './CreateNFT.schema'
import { UploadIPFSImage } from '@/components/ipfs/UploadIPFSImage'
import {
  TextArea,
  TextInput,
  // InputSlider
} from '@/components/forms'
import { Button } from '@/components/shared'

type CreateNFTFormProps = {
  defaultValues?: CreateNFTFormValues
  onSubmit: (values: CreateNFTFormValues) => void
}

export function CreateNFT({
  defaultValues,
  onSubmit,
}: CreateNFTFormProps): JSX.Element {
  const methods = useForm<CreateNFTFormValues>({
    defaultValues: {
      // duration: 7,
      maxSupply: 10,
      maxPerAddress: 1,
      royaltyPercentage: 5,
      ...defaultValues,
    },
    resolver: yupResolver(schema) as any,
  })

  const { control, formState, handleSubmit } = methods
  return (
    <FormProvider {...methods}>
      <form
        id="__create_nft"
        onSubmit={handleSubmit(onSubmit as any)}
        className="mx-auto max-w-[668px] w-full"

      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Controller
              control={control}
              name="mediaUrl"
              render={({ field }) => (
                <UploadIPFSImage
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <TextInput
            name="name"
            className="col-span-2"
            label="Title"
            placeholder="NFT's title"
            type="text"
          />
          <TextArea
            name="description"
            className="col-span-2"
            label="Description"
            placeholder="NFT's description"
            type="text"
          />
          <TextInput
            name="symbol"
            className="col-span-2"
            label="Symbol"
            placeholder="$Symbol"
            type="text"
          />
          {/* <div className="col-span-2">
            <Controller
              control={control}
              name="duration"
              render={({ field }) => (
                <InputSlider
                  value={field.value}
                  label="Duration"
                  onChange={field.onChange}
                />
              )}
            />
          </div> */}
          <TextInput name="maxSupply" label="No. of editions" type="number" />
          <TextInput
            name="pricePerMint"
            label="Price per edition"
            placeholder="NFT's price"
            type="text"
          />
          <TextInput
            name="maxPerAddress"
            label="Limit per address"
            defaultValue={1}
            type="text"
          />
          <TextInput name="royaltyPercentage" label="Royalty" type="number" />
          <TextInput
            name="fundsRecipient"
            className="col-span-2"
            label="Payout address"
            placeholder="payout address"
            type="text"
          />
          <TextInput
            className="col-span-2"
            name="defaultAdmin"
            label="Admin address"
            placeholder="admin address"
            type="text"
          />
        </div>
        <Button
          className="float-right mt-4"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Add Action
        </Button>
      </form>
    </FormProvider>
  )
}
