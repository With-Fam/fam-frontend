'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import ContinueButton from '@/components/ContinueButton'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { CHAIN_ID } from '@/constants/defaultChains'
import SwitchNetworkButton from '@/components/SwitchNetworkButton'
import { useCreateCommunityProvider } from '@/contexts/CreateCommunityProvider'
import { z } from 'zod'
import { useState } from 'react'

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
  const { deployHypersub, next } = useCreateCommunityProvider()
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm<DeployHypersubFormValues>({
    defaultValues: {
      confirm: false,
    },
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const handleDeployHypersub = async () => {
    if (!deployHypersub) {
      toast.error('Deploy function not available')
      return
    }

    setIsLoading(true)
    try {
      toast.loading('Deploying Hypersub...')
      const result = await deployHypersub()

      if (!result || 'error' in result) {
        throw result?.error || new Error('Failed to deploy')
      }

      toast.dismiss()
      toast.success('Hypersub deployed successfully!')
      next() // Move to the next step
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to deploy Hypersub')
      console.error('Deploy error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleDeployHypersub)}>
        {isCorrectChain ? (
          <ContinueButton title="Deploy Hypersub" loading={isLoading} />
        ) : (
          <SwitchNetworkButton />
        )}
      </form>
    </FormProvider>
  )
}
