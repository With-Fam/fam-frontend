import { DEPLOYMENT_ERROR } from '@/constants/consts'
import useCreatePartyManual from '@/hooks/useCreatePartyManual'
import { useFormStore } from '@/modules/create-community'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCreateCommunityProvider } from '@/contexts/CreateCommunityProvider'

const useDeploy = () => {
  const { createPartyAndHypersub } = useCreatePartyManual()
  const { setHypersubAddress } = useCreateCommunityProvider()
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
    const result = await createPartyAndHypersub()

    if (result.error) {
      if ((result.error as any).name === 'ChainMismatchError') {
        setDeploymentError(DEPLOYMENT_ERROR.MISMATCHING_NETWORK)
      } else {
        setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      }
      setIsLoading(false)
      setIsPendingTransaction(false)
      return
    }

    if (!result.partyAddress || !result.hypersubAddress) {
      setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      setIsPendingTransaction(false)
      return
    }

    setDeployedDao({
      token: result.partyAddress,
    })
    setHypersubAddress(result.hypersubAddress)

    toast.remove()
    toast.success('Community Deployed!')

    setIsPendingTransaction(false)
    setIsLoading(false)
    setFulfilledSections('DAO DONE')
    setActiveSection(activeSection + 1)
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
