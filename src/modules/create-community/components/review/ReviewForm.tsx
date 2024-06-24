'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import { useFormStore } from '@/modules/create-community'
import ContinueButton from '@/components/ContinueButton'
import { useRouter } from 'next/navigation'
import { CheckMark } from '@/components/icons'
import createCommunity from '@/lib/createCommunity'
import AddressCopy from '@/modules/create-community/components/review/AddressCopy'
import { AddressType } from '@/types'
import { CHAIN_ID } from '@/constants/defaultChains'

export function ReviewForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { chain } = useAccount()
  const { deployedDao, setFulfilledSections, general } = useFormStore()
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

      createCommunity({
        name: general.daoName,
        community_id: deployedDao.token,
        network: chain,
      })

      const successUrl =
        `/community/${CHAIN_ID}/${deployedDao.token}?created=true` as any
      push(successUrl)
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
