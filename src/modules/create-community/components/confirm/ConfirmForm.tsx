'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import schema, { type ConfirmFormValues } from './schema'
import ConfirmCheckbox from './ConfirmCheckbox'
import ContinueButton from '@/modules/ContinueButton'
import useDeploy from '@/hooks/useDeploy'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { CHAIN_ID } from '@/constants/defaultChains'
import SwitchNetworkButton from '@/components/SwitchNetworkButton'
import MembershipConfirmation from '@/modules/create-community/components/confirm/MembershipConfirmation'
import ProfileConfirmation from '@/modules/create-community/components/confirm/ProfileConfirmation'

export function ConfirmForm(): JSX.Element {
  const { wallet } = useConnectedWallet()
  const walletChainId = parseInt(wallet?.chainId.split(':')[1] as string, 10)
  const isCorrectChain = walletChainId === CHAIN_ID
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
        Make sure your community details before approving. These can only be
        changed later via a community vote.
      </p>
      <form onSubmit={handleSubmit(handleDeploy)}>
        <ProfileConfirmation />
        <MembershipConfirmation />
        <div className="mt-10">
          <ConfirmCheckbox name="deployDaoAcceptance">
            I have acknowledged and agree to the{' '}
            <Link href="#" className="text-orange">
              Fam Terms of Service
            </Link>
          </ConfirmCheckbox>
        </div>
        {isCorrectChain ? (
          <ContinueButton title="Create my Community" loading={isLoading} />
        ) : (
          <SwitchNetworkButton />
        )}
      </form>
    </FormProvider>
  )
}
