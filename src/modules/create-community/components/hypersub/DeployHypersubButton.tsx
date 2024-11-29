'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import ContinueButton from '@/components/ContinueButton'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { CHAIN_ID } from '@/constants/defaultChains'
import SwitchNetworkButton from '@/components/SwitchNetworkButton'
import { z } from 'zod'

const schema = z.object({
  confirm: z.boolean({
    required_error: 'please confirm your config',
  }),
})

type DeployHypersubFormValues = {
  confirm: boolean
}

export function DeployHypersubButton(): JSX.Element {
  const { wallet } = useConnectedWallet()
  const walletChainId = parseInt(wallet?.chainId.split(':')[1] as string, 10)
  const isCorrectChain = walletChainId === CHAIN_ID

  const methods = useForm<DeployHypersubFormValues>({
    defaultValues: {
      confirm: false,
    },
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const handleDeployHypersub = async () => {
    try {
      toast.loading('Deploying Hypersub...')
      // Add deployment logic here
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to deploy Hypersub')
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleDeployHypersub)}>
        {isCorrectChain ? (
          <ContinueButton title="Deploy Hypersub" loading={false} />
        ) : (
          <SwitchNetworkButton />
        )}
      </form>
    </FormProvider>
  )
}
