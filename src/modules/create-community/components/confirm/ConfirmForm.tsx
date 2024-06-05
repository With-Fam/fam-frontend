'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import schema, { type ConfirmFormValues } from './schema'
import { useFormStore } from '@/modules/create-community'
import ConfirmDropDown from './ConfirmDropDown'
import ConfirmItem from './ConfirmItem'
import ConfirmTitle from './ConfirmTitle'
import ConfirmCheckbox from './ConfirmCheckbox'
import ContinueButton from '@/modules/ContinueButton'
import { IPFSImage } from '@/components/ipfs/IPFSImage'
import useDeploy from '@/hooks/useDeploy'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import SwitchNetworkButton from '@/components/SwitchNetworkButton'

export function ConfirmForm(): JSX.Element {
  const { wallet } = useConnectedWallet()
  const walletChainId = parseInt(wallet?.chainId.split(':')[1] as string, 10)
  const isCorrectChain = walletChainId === CHAIN_ID
  const { general, membership } = useFormStore()
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
        <ConfirmDropDown text="Profile">
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
        <ConfirmDropDown text="Memberships">
          <div className="px-4 py-6 ">
            <ConfirmItem label="Membership price">
              {membership.membershipPrice} ETH
            </ConfirmItem>
            <ConfirmItem label="Mint Period">
              {membership.mintPeriod} Days
            </ConfirmItem>
            <ConfirmItem label="Revenue Split">
              {membership.revenueSplit}%
            </ConfirmItem>
            <div className="mt-2">
              <ConfirmTitle>{`Founders(s)`}</ConfirmTitle>
              <div className="mt-2 space-y-2">
                {membership.founders.map((founder) => (
                  <p>{founder.founderAddress}</p>
                ))}
              </div>
            </div>
          </div>
        </ConfirmDropDown>
        <div className="mt-10">
          <ConfirmCheckbox name="deployDaoAcceptance">
            I have acknolwedged and agree to the{' '}
            <Link href="#" className="text-orange">
              Fam Terms of Service
            </Link>
          </ConfirmCheckbox>
        </div>
        {isCorrectChain ? (
          <ContinueButton title="Confirm" loading={isLoading} />
        ) : (
          <SwitchNetworkButton />
        )}
      </form>
    </FormProvider>
  )
}
