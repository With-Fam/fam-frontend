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
import useSetHypersub from '@/hooks/useSetHypersub'

export function ReviewForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { deployedDao, setFulfilledSections } = useFormStore()
  const { hypersubAddress } = useCreateCommunityProvider()
  const { setHypersub, isLoading: isSettingHypersub } = useSetHypersub(
    deployedDao?.token
  )
  const { push } = useRouter()
  const methods = useForm()

  const handleComplete = async () => {
    if (!hypersubAddress || !deployedDao?.token) {
      toast.error('Hypersub or Party address not available')
      return
    }

    setIsLoading(true)
    try {
      // First link the hypersub to the party
      toast.loading('Linking Hypersub to Party...')
      const result = await setHypersub(hypersubAddress)

      if (!result || 'error' in result) {
        throw result?.error || new Error('Failed to link Hypersub')
      }

      toast.dismiss()
      toast.success('Hypersub linked successfully!')

      // Then navigate to the community page
      setFulfilledSections('deployed')
      const successUrl = `/community/${CHAIN_ID}/${deployedDao.token}?created=true`
      push(successUrl)
    } catch (error) {
      toast.dismiss()
      setIsLoading(false)
      toast.error('Failed to complete setup. Please try again.')
      console.error('Setup error:', error)
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
          <ContinueButton
            title="Complete Setup"
            loading={isLoading || isSettingHypersub}
          />
        </div>
      </form>
    </FormProvider>
  )
}
