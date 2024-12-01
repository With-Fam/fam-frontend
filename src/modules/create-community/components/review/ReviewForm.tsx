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
import { SuccessView } from './SuccessView'
import { Address } from 'viem'

export function ReviewForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { deployedDao, setFulfilledSections } = useFormStore()
  const { hypersubAddress } = useCreateCommunityProvider()
  const { push } = useRouter()
  const methods = useForm()

  const { handleSubmit } = methods

  const handleDeployMetadata = async () => {
    setIsLoading(true)
    setFulfilledSections('deployed')

    try {
      toast.remove()
      toast.success('DAO Deployed!')
      setIsLoading(false)

      const successUrl =
        `/community/${CHAIN_ID}/${deployedDao.token}?created=true` as any
      push(successUrl)
    } catch {
      setIsLoading(false)
      toast.error('Deployment error, try again!')
    }
  }

  // Show success view if both party and hypersub are deployed
  if (deployedDao?.token && hypersubAddress) {
    return (
      <SuccessView
        partyAddress={deployedDao.token as Address}
        hypersubAddress={hypersubAddress}
      />
    )
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleDeployMetadata)}
        className="mt-2 md:mt-10"
      >
        <div className="mx-auto max-w-[636px] rounded-lg">
          <div className="mb-5 flex items-center text-green-600">
            <CheckMark className="mr-2 h-6 w-6" />
            <span className="font-bold text-black">
              Successfully deployed Party
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-grey">Party Address</p>
              <AddressCopy address={deployedDao.token as Address} />
            </div>
          </div>
          <ContinueButton title="Continue" loading={isLoading} />
        </div>
      </form>
    </FormProvider>
  )
}
