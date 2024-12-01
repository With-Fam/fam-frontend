'use client'

import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { CheckMark } from '@/components/icons'
import AddressCopy from '@/modules/create-community/components/review/AddressCopy'
import { CHAIN_ID } from '@/constants/defaultChains'
import ContinueButton from '@/components/ContinueButton'
import { Address } from 'viem'
import { useState } from 'react'

interface SuccessViewProps {
  partyAddress: Address
  hypersubAddress: Address
}

export function SuccessView({
  partyAddress,
  hypersubAddress,
}: SuccessViewProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { push } = useRouter()
  const methods = useForm()

  const { handleSubmit } = methods

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      const successUrl = `/community/${CHAIN_ID}/${partyAddress}?created=true`
      push(successUrl)
    } catch {
      setIsLoading(false)
      toast.error('Navigation error, try again!')
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleComplete)} className="mt-2 md:mt-10">
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
              <AddressCopy address={partyAddress} />
            </div>
            <div>
              <p className="mb-2 text-sm text-grey">Hypersub Address</p>
              <AddressCopy address={hypersubAddress} />
            </div>
          </div>
          <ContinueButton title="Done" loading={isLoading} />
        </div>
      </form>
    </FormProvider>
  )
}
