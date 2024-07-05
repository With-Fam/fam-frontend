'use client'

import { FormProvider } from 'react-hook-form'
import _get from 'lodash.get'
import { TextInput } from '@/components/forms'
import AddActionButton from '@/components/AddActionButton'
import useSendEthProposalForm from '@/hooks/useSendEthProposalForm'

export function SendEth(): JSX.Element {
  const { methods, handleSubmit, onSubmit } = useSendEthProposalForm()

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
              defaultValue="1"
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
