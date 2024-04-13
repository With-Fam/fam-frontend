import { DEPLOYMENT_ERROR } from '@/constants/consts'
import { partyFactoryAbi } from '@/data/contract/abis/PartyFactory'
import useCreateParty from '@/hooks/useCreateParty'
import { useFormStore } from '@/modules/create-community'
import { Interface } from 'ethers'
import { useState } from 'react'
import toast from 'react-hot-toast'

const useDeploy = () => {
  const { createParty } = useCreateParty()
  const {
    founderAllocation,
    contributionAllocation,
    setActiveSection,
    activeSection,
    setDeployedDao,
    ipfsUpload,
    setFulfilledSections,
  } = useFormStore()

  const [isPendingTransaction, setIsPendingTransaction] =
    useState<boolean>(false)
  const [deploymentError, setDeploymentError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleDeploy = async () => {
    setIsLoading(true)
    setDeploymentError(undefined)

    if (
      [...founderAllocation, ...contributionAllocation].find(
        (founder) => typeof founder.allocationPercentage === 'undefined'
      )
    ) {
      setDeploymentError(DEPLOYMENT_ERROR.INVALID_ALLOCATION_PERCENTAGE)
      return
    }

    setIsPendingTransaction(true)
    const transaction = await createParty()
    const error = (transaction as any)?.error
    if (error) {
      if ((error as any).name === 'ChainMismatchError') {
        setDeploymentError(DEPLOYMENT_ERROR.MISMATCHING_NETWORK)
      } else {
        setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      }
      setIsLoading(false)
      setIsPendingTransaction(false)
      return
    }

    const managerInterface = new Interface(partyFactoryAbi)

    const deployEvent = (transaction as any)?.logs.find(
      (log: any) =>
        log?.topics[0]?.toLowerCase() ===
        '0x2c83cc7f2e67cf5f6cc54d64518c7769f402efa96e5e1b24cfab3cfbdca271ea'
    )

    let parsedEvent
    try {
      parsedEvent = managerInterface.parseLog({
        topics: deployEvent?.topics || [],
        data: deployEvent?.data || '',
      })
    } catch {}

    const deployedAddresses = parsedEvent?.args

    if (!deployedAddresses) {
      setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      setIsPendingTransaction(false)
      return
    }

    setDeployedDao({
      token: deployedAddresses[0],
    })

    if (deployedAddresses) {
      toast.remove()
      toast.success('DAO Deployed!')
    }

    setIsPendingTransaction(false)
    setIsLoading(false)
    setFulfilledSections('DAO DONE')
    console.log('big success...')
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
