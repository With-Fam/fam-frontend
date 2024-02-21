'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { getAddress } from 'viem'
import _get from 'lodash.get'

// Hooks & Stores
import { useDaoStore } from '@/modules/dao'
import { useBalance } from 'wagmi'
import { useProposalStore } from '@/modules/create-activity/stores'

// Types
import { TransactionType } from '@/modules/create-activity/types'
import { useChainStore } from '@/utils/stores/useChainStore'
import { getEnsAddress } from '@/utils/ens'
import { getProvider } from '@/utils/provider'
import { walletSnippet } from '@/utils/helpers'
import { AddressType, CHAIN_ID } from '@/types'

// Components
import { TextInput } from '@/components/forms'
// import { Button } from '@/components/shared'
// import { Paragraph } from '@/stories'
import { AddActionButton, CurrencyList } from '../action'

// Schema
import schema, { SendEthValues } from './SendEthForm.schema'

/*--------------------------------------------------------------------*/

/**
 * Componennt
 */

import { Transaction } from '@/modules/create-activity/stores'
import { ActionFormProps } from '@/modules/create-activity'

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
  const { treasury } = useDaoStore((state) => state.addresses)
  const chain = useChainStore((x) => x.chain)
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

  const { data: treasuryBalance } = useBalance({
    address: treasury,
    chainId: chain.id,
  })

  const methods = useForm<SendEthValues>({
    defaultValues: {
      recipientAddress: defaultValues.target,
      amount: Number(defaultValues.value),
    },
    resolver: yupResolver(schema(parseFloat(treasuryBalance?.formatted ?? ''))),
  })
  const onSubmit = async (values: SendEthValues) => {
    // Need a callback to return to OG state
    if (!(values.amount && values.recipientAddress)) return
    if (exists && defaultValues && !hasChanged(values, defaultValues)) {
      callback()
      return
    }

    const target = await getEnsAddress(
      values.recipientAddress,
      getProvider(CHAIN_ID.ETHEREUM)
    )
    const value = values.amount.toString()

    const builderTransaction = {
      type: TransactionType.SEND_ETH,
      summary: `Send ${value} ETH to ${walletSnippet(target)}`,
      transactions: [
        {
          functionSignature: 'sendEth(address)',
          target: getAddress(target),
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
            <CurrencyList />
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
