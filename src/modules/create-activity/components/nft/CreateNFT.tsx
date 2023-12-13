'use client'

// Framework
import { useCallback, useState } from 'react'
import { useAccount } from 'wagmi'

// Forms
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Components
import { UploadIPFSImage } from '@/components/ipfs/UploadIPFSImage'
import {
  TextArea,
  TextInput,
  // InputSlider
} from '@/components/forms'
import { Button } from '@/components/shared'
import { EditionTypeRadio } from './EditionTypeRadio'

// Chain
import { useDaoStore } from '@/modules/dao'

// Schema
import schema, {
  type CreateNFTFormValues,
  type EditionType,
} from './CreateNFT.schema'
import { InputENSAddress } from '@/components/ipfs'

type CreateNFTFormProps = {
  callback: () => void
}

export function CreateNFT({ callback }: CreateNFTFormProps): JSX.Element {
  const [editionType, setEditionType] = useState<EditionType>('fixed')
  const [isIPFSUploading, setIsIPFSUploading] = useState(false)
  const { address: user } = useAccount()
  const { treasury } = useDaoStore((x) => x.addresses)
  const initialValues: CreateNFTFormValues = {
    name: '',
    symbol: '',
    description: '',
    mediaUrl: '',
    coverUrl: '',
    fundsRecipient: treasury || '',
    defaultAdmin: user || '',
    publicSaleStart: '',
    publicSaleEnd: '',
    royaltyPercentage: 5,
    pricePerMint: 0,
    maxSupply: 10,
  }
  const methods = useForm<CreateNFTFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema) as any,
  })
  const { control, formState, handleSubmit, setValue } = methods

  const handleEditionTypeChanged = useCallback(
    (value: EditionType) => {
      setValue('maxSupply', value === 'open' ? 0 : undefined)
      setEditionType(value)
    },
    [setEditionType, setValue]
  )

  console.log('address::', user, initialValues.defaultAdmin)

  return (
    <FormProvider {...methods}>
      <form
        id="__create_nft"
        onSubmit={handleSubmit(callback as any)}
        className="mx-auto w-full max-w-[668px]"
      >
        <div className="grid grid-cols-2 gap-4">
          <EditionTypeRadio
            editionType={editionType}
            onChange={handleEditionTypeChanged}
          />
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
          <Controller
            control={control}
            name="fundsRecipient"
            defaultValue={initialValues.fundsRecipient}
            render={({ field }) => (
              <InputENSAddress
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                className="col-span-2"
                label="Payout address"
                placeholder="payout address"
              />
            )}
          />
          <Controller
            control={control}
            name="defaultAdmin"
            render={({ field }) => (
              <InputENSAddress
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                className="col-span-2"
                label="Admin address"
                placeholder="admin address"
              />
            )}
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
