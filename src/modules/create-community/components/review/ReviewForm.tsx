'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNetwork } from 'wagmi'
import toast from 'react-hot-toast'
import ContinueButton from '@/modules/ContinueButton'
import { useFormStore } from '@/modules/create-community'
import { useRouter } from 'next/navigation'
import { CheckMark } from '@/components/icons'
import createCommunity from '@/utils/createCommunity'
import AddressCopy from '@/modules/create-community/components/review/AddressCopy'
import { AddressType } from '@/types'

export function ReviewForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { chain } = useNetwork() as any
  const { deployedDao, setFulfilledSections, resetForm, general } =
    useFormStore()
  const router = useRouter()
  const methods = useForm()

  const { handleSubmit } = methods

  const handleDeployMetadata = async () => {
    setIsLoading(true)
    setFulfilledSections('deployed')

    try {
      toast.remove()
      toast.success('DAO Deployed!')
      setIsLoading(false)

      createCommunity({
        name: general.daoName,
        community_id: deployedDao.token,
        network: chain?.network,
      })

      const successUrl = `/community/${chain?.network}/${deployedDao.token}/`
      await router.push(successUrl)
      setTimeout(() => {
        resetForm()
      }, 200)
    } catch {
      setIsLoading(false)
      toast.error('Deployment error, try again!')
    }
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
              Successfully deployed contracts
            </span>
          </div>

          <div className="space-y-2">
            <AddressCopy address={deployedDao.token as AddressType} />
          </div>
          <ContinueButton title="Done" loading={isLoading} />
        </div>
      </form>
    </FormProvider>
  )
}
