// Framework
import { FormProvider, useForm } from 'react-hook-form'

// Local Components
import { AddActionButton } from '@/components/create-activity'
import { TextInput } from '@/components/forms'

// Schema
import schema, { AirdropFormValues } from './AirdropForm.schema'
import { yupResolver } from '@hookform/resolvers/yup'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

type AirdropFormProps = {
  onSubmit: (a: AirdropFormValues) => void
}

export function AirdropForm({ onSubmit }: AirdropFormProps): JSX.Element {
  const methods = useForm<AirdropFormValues>({
    resolver: yupResolver<AirdropFormValues>(schema as any),
    defaultValues: {
      recipientAddress: '',
    },
  })
  const { handleSubmit } = methods
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[668px]"
      >
        <TextInput
          name="recipientAddress"
          label="Recipient"
          type="text"
          placeholder="Recipient's address"
          className="block w-full text-lg outline-0"
        />
        <AddActionButton />
      </form>
    </FormProvider>
  )
}
