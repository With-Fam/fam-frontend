'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { Address } from 'viem'
import _get from 'lodash.get'
import { useProposalStore } from '@/modules/create-activity/stores'
import { TransactionType } from '@/modules/create-activity/types'
import { TextInput } from '@/components/forms'
import AddActionButton from '@/components/AddActionButton'
import { ZoraCollectValues } from './ZoraCollectForm.schema'
import { Transaction } from '@/modules/create-activity/stores'
import { ActionFormProps } from '@/modules/create-activity'
import { useParams } from 'next/navigation'
import Advanced from '@/modules/create-activity/components/zora-collect/Advanced'

function hasChanged(
  values: ZoraCollectValues,
  previous: Pick<Transaction, 'target' | 'value' | 'tokenId' | 'ethPrice'>
) {
  return (
    values.tokenRecipient !== previous.target ||
    values.collectionAddress !== previous.value ||
    values.ethPrice !== previous.ethPrice ||
    values.tokenId !== previous.tokenId
  )
}

export function ZoraCollect({
  callback,
}: Pick<ActionFormProps, 'callback'>): JSX.Element {
  const { addTransaction, editTransaction, transactions } = useProposalStore()
  const exists = transactions.find(({ type }) => type === 'zora-collect')
  const { community } = useParams()
  const defaultValues: Pick<
    Transaction,
    'target' | 'value' | 'tokenId' | 'ethPrice'
  > = _get(exists, 'transactions[0]', {
    target: community as Address,
    value: '' as Address,
    ethPrice: 0,
    tokenId: 1n,
  })

  const methods = useForm<ZoraCollectValues>({
    defaultValues: {
      tokenRecipient: defaultValues.target,
      collectionAddress: defaultValues.value as Address,
      ethPrice: defaultValues.ethPrice,
      tokenId: defaultValues.tokenId,
    },
  })
  const onSubmit = async (values: ZoraCollectValues) => {
    if (!(values.collectionAddress && values.tokenRecipient)) return
    if (exists && defaultValues && !hasChanged(values, defaultValues)) {
      callback()
      return
    }

    const target = values.tokenRecipient
    const value = values.collectionAddress
    const tokenId = values.tokenId
    const ethPrice = values.ethPrice

    const builderTransaction = {
      type: TransactionType.ZORA_COLLECT,
      transactions: [
        {
          functionSignature: 'zoraCollect(address)',
          target,
          value,
          tokenId,
          ethPrice,
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

  const { handleSubmit } = methods
  return (
    <FormProvider {...methods}>
      <form
        id="__zora_collect"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[668px]"
      >
        <div className="flex flex-col gap-2">
          <div className="relative z-0">
            <TextInput
              name="tokenRecipient"
              label="Party"
              type="text"
              placeholder="Party"
              className="block w-full text-lg outline-0"
              readOnly
            />
          </div>
          <TextInput
            name="collectionAddress"
            label="Zora Collection"
            type="text"
            placeholder="Zora Collection"
            className="block w-full text-lg outline-0"
          />
        </div>
        <Advanced />
        <AddActionButton />
      </form>
    </FormProvider>
  )
}
