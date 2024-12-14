import { DEPLOYMENT_ERROR } from '@/constants/consts'
import useCreatePartyManual from '@/hooks/useCreatePartyManual'
import { useFormStore } from '@/modules/create-community'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCreateCommunityProvider } from '@/contexts/CreateCommunityProvider'
import useConnectedWallet from './useConnectedWallet'
import { Address } from 'viem'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { createHypersubMulticall } from '@/lib/hypersub/createHypersubMulticall'

const useDeploy = () => {
  const { createParty } = useCreatePartyManual()
  const { membership } = useFormStore()
  const { connectedWallet: address } = useConnectedWallet()
  const { setHypersubAddress } = useCreateCommunityProvider()
  const { walletClient } = usePrivyWalletClient()
  const {
    setActiveSection,
    activeSection,
    setDeployedDao,
    setFulfilledSections,
  } = useFormStore()

  const [isPendingTransaction, setIsPendingTransaction] =
    useState<boolean>(false)
  const [deploymentError, setDeploymentError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeploy = async () => {
    setIsLoading(true)
    setDeploymentError(undefined)
    setIsPendingTransaction(true)

    try {
      const partyResult = await createParty()
      if (partyResult.error || !partyResult.partyAddress || !walletClient) {
        throw partyResult.error || new Error('Failed to create party')
      }

      const hypersubResult = await createHypersubMulticall({
        founderAddresses: membership.founders.map(
          (f) => f.founderAddress as Address
        ),
        ownerAddress: address as Address,
        walletClient,
        partyAddress: partyResult.partyAddress,
      })
      if (hypersubResult.error || !hypersubResult.hypersubAddress) {
        throw hypersubResult.error || new Error('Failed to create hypersub')
      }

      setDeployedDao({
        token: partyResult.partyAddress,
      })
      setHypersubAddress(hypersubResult.hypersubAddress)

      toast.remove()
      toast.success('Community Deployed!')

      setIsPendingTransaction(false)
      setIsLoading(false)
      setFulfilledSections('DAO DONE')
      setActiveSection(activeSection + 1)
    } catch (error) {
      console.error('Deployment error:', error)
      setDeploymentError(
        (error as any)?.name === 'ChainMismatchError'
          ? DEPLOYMENT_ERROR.MISMATCHING_NETWORK
          : DEPLOYMENT_ERROR.GENERIC
      )
      setIsLoading(false)
      setIsPendingTransaction(false)
    }
  }

  return {
    isPendingTransaction,
    deploymentError,
    handleDeploy,
    isLoading,
    setIsLoading,
  }
}

export default useDeploy
