'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { getAddress } from 'viem'

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
import { CHAIN_ID } from '@/types'

// Components
import { TextInput } from '@/components/forms'
import { Button } from '@/components/shared'
import { Paragraph } from '@/stories'
import { AddActionButton, CurrencyList } from '../action'

// Schema
import schema, { SendEthValues } from './SendEthForm.schema'

/*--------------------------------------------------------------------*/

/**
 * Componennt
 */

export function SendEth(): JSX.Element {
  const { treasury } = useDaoStore((state) => state.addresses)
  const chain = useChainStore((x) => x.chain)
  const addTransaction = useProposalStore((state) => state.addTransaction)
  const { data: treasuryBalance } = useBalance({
    address: treasury,
    chainId: chain.id,
  })
  const initialValues: SendEthValues = {
    recipientAddress: '',
    amount: 0,
  }
  const methods = useForm<SendEthValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema(parseFloat(treasuryBalance?.formatted ?? ''))),
  })
  const onSubmit = async (values: SendEthValues) => {
    if (!values.amount || !values.recipientAddress) return

    const target = await getEnsAddress(
      values.recipientAddress,
      getProvider(CHAIN_ID.ETHEREUM)
    )
    const value = values.amount.toString()

    addTransaction({
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
    })

    methods.reset()
  }

  const { handleSubmit } = methods
  return (
    <FormProvider {...methods}>
      <form
        id="__create_nft"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[668px] w-full"
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
        <div className="flex w-full justify-center">
          <Button type="button" variant="secondary" className="mt-6 px-3 py-2">
            <Paragraph as="p5" className="">
              Add recipient
            </Paragraph>
          </Button>
        </div>
        <AddActionButton />
      </form>
    </FormProvider>
  )
}
