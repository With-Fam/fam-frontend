'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormStore } from '@/modules/create-community'
import ContinueButton from '@/components/ContinueButton'
import { useRouter } from 'next/navigation'
import { CheckMark } from '@/components/icons'
import AddressCopy from '@/modules/create-community/components/review/AddressCopy'
import { CHAIN_ID } from '@/constants/defaultChains'
import { useCreateCommunityProvider } from '@/contexts/CreateCommunityProvider'
import { Address } from 'viem'

export function ReviewForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { deployedDao, setFulfilledSections } = useFormStore()
  const { hypersubAddress } = useCreateCommunityProvider()
  const { push } = useRouter()
  const methods = useForm()

  const handleComplete = async () => {
    setIsLoading(true)
    setFulfilledSections('deployed')

    try {
      const successUrl = `/community/${CHAIN_ID}/${deployedDao.token}?created=true`
      push(successUrl)
    } catch {
      setIsLoading(false)
      toast.error('Navigation error, try again!')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleComplete)}
        className="mt-2 md:mt-10"
      >
        <div className="mx-auto max-w-[636px] rounded-lg">
          <div className="mb-5 flex items-center text-green-600">
            <CheckMark className="mr-2 h-6 w-6" />
            <span className="font-bold text-black">
              Successfully deployed contracts
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-grey">Party Address</p>
              <AddressCopy address={deployedDao.token as Address} />
            </div>
            <div>
              <p className="mb-2 text-sm text-grey">Hypersub Address</p>
              <AddressCopy address={hypersubAddress as Address} />
            </div>
          </div>
          <ContinueButton title="Done" loading={isLoading} />
        </div>
      </form>
    </FormProvider>
  )
}
