'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useNetwork } from 'wagmi'
import schema, { type ConfirmFormValues } from './schema'
import { useFormStore } from '@/modules/create-community'
import ConfirmDropDown from './ConfirmDropDown'
import ConfirmItem from './ConfirmItem'
import ConfirmTitle from './ConfirmTitle'
import ConfirmCheckbox from './ConfirmCheckbox'
import ContinueButton from '@/modules/ContinueButton'
import { IPFSImage } from '@/components/ipfs/IPFSImage'
import useDeploy from '@/hooks/useDeploy'

export function ConfirmForm(): JSX.Element {
  const { chain } = useNetwork()
  const { general } = useFormStore()
  const {
    isLoading,
    handleDeploy,
    isPendingTransaction,
    deploymentError,
    setIsLoading,
  } = useDeploy()

  const methods = useForm<ConfirmFormValues>({
    defaultValues: {
      confirm: false,
    },
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  useEffect(() => {
    if (isPendingTransaction) {
      toast.loading('Deploying DAO...')
    }
    if (deploymentError) {
      toast.dismiss()
      toast.error(deploymentError)
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingTransaction, deploymentError])

  return (
    <FormProvider {...methods}>
      <p className="mb-6 mt-4 text-left text-grey md:mt-16">
        Make sure your community details are correct before approving. These can
        only be changed later via a community vote.
      </p>
      <form onSubmit={handleSubmit(handleDeploy)}>
        <ConfirmDropDown text="General Info">
          <div className="px-4 py-6 ">
            <div>
              <ConfirmTitle>DAO AVATAR</ConfirmTitle>
              <div className="mt-2">
                <IPFSImage
                  src={general.daoAvatar as any}
                  alt="dao avatar"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full"
                />
              </div>
            </div>
            <ConfirmItem label="DAO NAME">{general.daoName}</ConfirmItem>
            <ConfirmItem label="DAO SYMBOL">{general.daoSymbol}</ConfirmItem>
            <ConfirmItem label="DAO WEBSITE">{general.daoWebsite}</ConfirmItem>
          </div>
        </ConfirmDropDown>
        <div className="mt-10">
          <ConfirmCheckbox name="deployDaoAcceptance">
            I am deploying my DAO on{' '}
            <Link href="#" className="text-orange">
              {chain?.name}
            </Link>
          </ConfirmCheckbox>
        </div>
        <ContinueButton title="Confirm" loading={isLoading} />
      </form>
    </FormProvider>
  )
}
