'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { Address } from 'viem'
import _get from 'lodash.get'
import { useProposalStore } from '@/modules/create-activity/stores'
import { TransactionType } from '@/modules/create-activity/types'
import { walletSnippet } from '@/utils/helpers'
import { AddressType } from '@/types'
import { TextInput } from '@/components/forms'
import AddActionButton from '@/components/AddActionButton'
import { SendEthValues } from './SendEthForm.schema'
import { Transaction } from '@/modules/create-activity/stores'
import { ActionFormProps } from '@/modules/create-activity'
import getEnsAddress from '@/utils/getEnsAddress'

function hasChanged(
  values: SendEthValues,
  previous: Pick<Transaction, 'target' | 'value'>
) {
  return (
    values.recipientAddress !== previous.target ||
    values.amount !== Number(previous.value)
  )
}

export function SendEth({
  callback,
}: Pick<ActionFormProps, 'callback'>): JSX.Element {
  const { addTransaction, editTransaction, transactions } = useProposalStore()
  const exists = transactions.find(({ type }) => type === 'send-eth')

  const defaultValues: Pick<Transaction, 'target' | 'value'> = _get(
    exists,
    'transactions[0]',
    {
      target: '' as AddressType,
      value: '0',
    }
  )

  const methods = useForm<SendEthValues>({
    defaultValues: {
      recipientAddress: defaultValues.target,
      amount: Number(defaultValues.value),
    },
  })
  const onSubmit = async (values: SendEthValues) => {
    if (!(values.amount && values.recipientAddress)) return
    if (exists && defaultValues && !hasChanged(values, defaultValues)) {
      callback()
      return
    }

    const ensAddress = await getEnsAddress(values.recipientAddress)
    const target = (ensAddress || values.recipientAddress) as Address

    const value = values.amount.toString()

    const builderTransaction = {
      type: TransactionType.SEND_ETH,
      summary: `Send ${value} ETH to ${walletSnippet(target)}`,
      transactions: [
        {
          functionSignature: 'sendEth(address)',
          target,
          value,
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
        id="__send_eth"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[668px]"
      >
        <div className="flex flex-col gap-2">
          <div className="relative z-0">
            <TextInput
              name="amount"
              label="Amount"
              type="number"
              defaultValue="1"
              step="0.0001"
              className="block w-full text-lg outline-0"
            />
          </div>
          <TextInput
            name="recipientAddress"
            label="Recipient"
            type="text"
            placeholder="Recipient's address"
            className="block w-full text-lg outline-0"
          />
        </div>
        <AddActionButton />
      </form>
    </FormProvider>
  )
}
