'use client'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Address, zeroAddress } from 'viem'
import _get from 'lodash.get'
import { useProposalStore } from '@/modules/create-activity/stores'
import { TransactionType } from '@/modules/create-activity/types'
import { TextArea, TextInput } from '@/components/forms'
import { AddActionButton } from '../action'
import { ZoraCreateValues } from './ZoraCreateForm.schema'
import { Transaction } from '@/modules/create-activity/stores'
import { ActionFormProps } from '@/modules/create-activity'
import { useParams } from 'next/navigation'
import { UploadIPFSImage } from '@/components/ipfs/UploadIPFSImage'
import Advanced from '@/modules/create-activity/components/zora-create/Advanced'

function hasChanged(
  values: ZoraCreateValues,
  previous: Pick<
    Transaction,
    | 'target'
    | 'collectionImage'
    | 'title'
    | 'description'
    | 'pricePerEdition'
    | 'duration'
    | 'payoutAddress'
  >
) {
  return (
    values.pricePerEdition !== previous.pricePerEdition ||
    values.collectionImage !== previous.collectionImage ||
    values.title !== previous.title ||
    values.description !== previous.description ||
    values.duration !== previous.duration ||
    values.payoutAddress !== previous.payoutAddress
  )
}

export function ZoraCreate({
  callback,
}: Pick<ActionFormProps, 'callback'>): JSX.Element {
  const { addTransaction, editTransaction, transactions } = useProposalStore()
  const exists = transactions.find(({ type }) => type === 'zora-create')
  const { community } = useParams()
  const defaultValues: Pick<
    Transaction,
    | 'target'
    | 'collectionImage'
    | 'title'
    | 'description'
    | 'pricePerEdition'
    | 'duration'
    | 'payoutAddress'
  > = _get(exists, 'transactions[0]', {
    target: community as Address,
    collectionImage: '',
    title: '',
    description: '',
    pricePerEdition: 0.0001,
    duration: 0,
    payoutAddress: zeroAddress,
  })

  const methods = useForm<ZoraCreateValues>({
    defaultValues: {
      collectionImage: defaultValues.collectionImage,
      title: defaultValues.title,
      description: defaultValues.description,
      pricePerEdition: defaultValues.pricePerEdition,
      duration: defaultValues.duration,
      payoutAddress: defaultValues.payoutAddress,
    },
  })
  const onSubmit = async (values: ZoraCreateValues) => {
    if (exists && defaultValues && !hasChanged(values, defaultValues)) {
      callback()
      return
    }

    const builderTransaction = {
      type: TransactionType.ZORA_CREATE,
      transactions: [
        {
          functionSignature: 'zoraCreate(address)',
          target: community as Address,
          value: '',
          collectionImage: values.collectionImage,
          title: values.title,
          description: values.description,
          pricePerEdition: values.pricePerEdition,
          duration: values.duration,
          payoutAddress: values.payoutAddress,
          calldata: '0x',
        },
      ],
    }

    if (exists) {
      const idx = transactions.indexOf(exists)
      editTransaction(idx, builderTransaction)
    } else {
      addTransaction(builderTransaction)
    }
    callback()
  }

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
            min={0.0001}
          />
        </div>
        <Advanced control={control} />
        <AddActionButton />
      </form>
    </FormProvider>
  )
}
