'use client'

import { FormProvider } from 'react-hook-form'
import _get from 'lodash.get'
import { TextInput } from '@/components/forms'
import AddActionButton from '@/components/AddActionButton'
import useZoraCollectProposalForm from '@/hooks/useZoraCollectProposalForm'

export function ZoraCollect(): JSX.Element {
  const { methods, handleSubmit, onSubmit } = useZoraCollectProposalForm()

  return (
    <FormProvider {...methods}>
      <form
        id="__zora_collect"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[668px]"
      >
        <div className="flex flex-col gap-2">
          <div className="relative z-0" style={{ display: 'none' }}>
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
        <AddActionButton />
      </form>
    </FormProvider>
  )
}
