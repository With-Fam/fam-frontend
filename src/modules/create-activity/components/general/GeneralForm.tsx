'use client'

// Framework
import dynamic from 'next/dynamic'

// Third Parties
import { FormProvider, useForm } from 'react-hook-form'
const DescriptionEditor = dynamic(() => import('./DescriptionEditor'), {
  ssr: false,
}) // Quill library requires a dynamic import to not break SSR

// Schema and types
import schema, { GeneralActivityValues } from './schema'

// Components
import TitleInput from '@/modules/create-activity/components/general/TitleInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddButton } from './AddButton'

// Types

type GeneralFormProps = {
  activityType?: string
  defaultValues: GeneralActivityValues
  onSubmit: (_a: GeneralActivityValues) => void
}

export function GeneralForm({
  activityType,
  defaultValues,
  onSubmit,
}: GeneralFormProps): JSX.Element {
  const methods = useForm<GeneralActivityValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-2xl grow flex-col"
      >
        <div className="flex grow flex-col">
          <div className="order-1 sm:order-2">
            <TitleInput
              name="activityName"
              placeholder="Title"
              className="block w-full text-lg outline-0"
            />
          </div>
          <DescriptionEditor
            name="activityDescription"
            placeholder="Description"
          />
        </div>
        <AddButton activityType={activityType} />
      </form>
    </FormProvider>
  )
}
