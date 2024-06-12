'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { Address } from 'viem'
import _get from 'lodash.get'
import { useProposalStore } from '@/modules/create-activity/stores'
import { TransactionType } from '@/modules/create-activity/types'
import { walletSnippet } from '@/utils/helpers'
import { TextInput } from '@/components/forms'
import { AddActionButton } from '../action'
import { ZoraCreateValues } from './ZoraCreateForm.schema'
import { Transaction } from '@/modules/create-activity/stores'
import { ActionFormProps } from '@/modules/create-activity'
import { useParams } from 'next/navigation'

function hasChanged(
  values: ZoraCreateValues,
  previous: Pick<Transaction, 'target'>
) {
  return values.party !== previous.target
}

export function ZoraCreate({
  callback,
}: Pick<ActionFormProps, 'callback'>): JSX.Element {
  const { addTransaction, editTransaction, transactions } = useProposalStore()
  const exists = transactions.find(({ type }) => type === 'zora-create')
  const { community } = useParams()
  const defaultValues: Pick<Transaction, 'target'> = _get(
    exists,
    'transactions[0]',
    {
      target: community as Address,
    }
  )

  const methods = useForm<ZoraCreateValues>({
    defaultValues: {
      party: defaultValues.target,
    },
  })
  const onSubmit = async (values: ZoraCreateValues) => {
    if (!values.party) return
    if (exists && defaultValues && !hasChanged(values, defaultValues)) {
      callback()
      return
    }

    const target = values.party

    const builderTransaction = {
      type: TransactionType.ZORA_CREATE,
      summary: `Bring your own party ${walletSnippet(target)}. create on zora.`,
      transactions: [
        {
          functionSignature: 'zoraCreate(address)',
          target,
          value: '',
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
              name="party"
              label="Party"
              type="text"
              placeholder="Party"
              className="block w-full text-lg outline-0"
              readOnly
            />
          </div>
        </div>
        <AddActionButton />
      </form>
    </FormProvider>
  )
}
