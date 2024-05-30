'use client'
import { Paragraph } from '@/stories'

// data
import { MembershipTypes } from '@/types/create-community'

// validation
import ContinueButton from '@/modules/ContinueButton'
import { TextInput } from '@/components/forms'
import { FormProvider, useForm } from 'react-hook-form'
import { MembershipFormValues, membershipValidationSchema } from '@/modules/create-community/components/membership/MembershipForm.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'

export type FormValues = {
  type: MembershipTypes
}

// Helpers
const DEFAULTS: MembershipFormValues = {
  membershipPrice: 0.01,
  mintPeriod: 5,
  revenueSplit: 1,
  founderAllocation: []
}

export function MembershipForm(): JSX.Element {
  const methods = useForm<MembershipFormValues>({
    resolver: yupResolver(
      membershipValidationSchema
    ) as any,
    defaultValues: {
      ...DEFAULTS,
    },
  })

  const { handleSubmit } = methods

  const onSubmit = () => {}

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paragraph as="p4" className="text-left text-grey-dark mt-6">
          Set your membership price, revenue split adn
          add additional founders
        </Paragraph>
        <div className="relative z-0 mt-4">
          <TextInput
            name="membership price"
            type="number"
            step="0.01"
            label="Membership price"
            placeholder="0.01 ETH"
          />
          <div className='absolute flex gap-1 items-center right-3 bottom-3 border rounded-full p-0.5 bg-white-secondary'>
            <div className='w-8 h-8 relative rounded-full overflow-hidden'>
              <Image
                src="https://i.imgur.com/n93Kwtm.png"
                layout='fill'
                alt=""
              />
            </div>
            <p className='font-abcMedium text-md text-black pr-2'>ETH</p>
          </div>
        </div>
        <ContinueButton />
      </form>
    </FormProvider>
  )
}
