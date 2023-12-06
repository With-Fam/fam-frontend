// Framework
import Image from 'next/image'
import { Controller, FormProvider, useForm } from 'react-hook-form'

// Local Components
import { AddActionButton } from '@/components/create-activity'
import { Button, ImageUpload, PhaseName } from '@/components/shared'
import { TextInput, InputSlider } from '@/components/forms'
import { Paragraph } from '@/stories'

// Schema
import schema, { CrowdfundValues } from './Crowdfund.schema'
import { zodResolver } from '@hookform/resolvers/zod'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

type CrowdfundProps = {
  defaultValues?: CrowdfundValues
  onSubmit: (a: CrowdfundValues) => void
}

export function Crowdfund({
  defaultValues,
  onSubmit,
}: CrowdfundProps): JSX.Element {
  const methods = useForm<CrowdfundValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })
  const { control, handleSubmit } = methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <PhaseName>Add Crowdfund</PhaseName>
        </div>
        <div className="mx-auto max-w-[668px]">
          <ImageUpload formId="image" />
          <div className="mt-6">
            <TextInput
              name="action-title"
              label="Title"
              type="text"
              placeholder="Title"
              className="block w-full text-lg outline-0"
            />
          </div>
          <Paragraph as="p4" className="py-6 text-left text-grey">
            Choose an amount you&apos;d like to raise and set the Crowdfund
            duration. If you do not reach the fundraising goal contributors will
            be refunded
          </Paragraph>
          <TextInput
            name="goal"
            label="Fundraising goal"
            type="text"
            placeholder="0.05 ETH"
            className="block w-full text-lg outline-0"
          />
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <InputSlider
                label="Diration"
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <Paragraph as="p4" className="py-6 text-left text-grey">
            Hosts can edit the Crowdfund details, cancel the Crowdfund and more
          </Paragraph>
          <div className="flex-1">
            <div className="flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black">
              <p className="mb-2 block font-abcMedium text-sm">Hosts</p>
              <div className="mb-2 flex items-center gap-2">
                <div className="relative h-4 w-4">
                  <Image
                    src="/assets/images/community/m1.jpeg"
                    alt=""
                    fill
                    className="h-4 w-4 rounded-full object-cover"
                  />
                </div>
                <Paragraph as="p5">agcook.eth</Paragraph>
                <p className="rounded-3xl bg-blue bg-opacity-10 px-2 py-1 text-xs text-blue">
                  You
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                className="mx-auto mt-4 px-3 py-2"
              >
                <Paragraph as="p5" className="">
                  Add host
                </Paragraph>
              </Button>
            </div>
          </div>
          <AddActionButton />
        </div>
      </form>
    </FormProvider>
  )
}
