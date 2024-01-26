import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useContractRead } from 'wagmi'
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import toast from 'react-hot-toast'
import ContinueButton from '@/modules/ContinueButton'
import { useFormStore } from '@/modules/create-community'
import { transformFileProperties } from '@/utils/transformFileProperties'
import { metadataAbi, tokenAbi } from '@/data/contract/abis'
import { useRouter } from 'next/navigation'
import { CheckMark, Copy } from '@/components/icons'
import { Paragraph } from '@/stories'
import { getChainId } from '@/utils/getChainId'

const DEPLOYMENT_ERROR = {
  MISMATCHING_SIGNER:
    'Oops, it looks like the owner of the token contract differs from your signer address. Please ensure that this transaction is handled by the same address.',
  GENERIC:
    'Oops! Looks like there was a problem. Please ensure that your input data is correct',
}

const createCommunity = async (community: any) => {
  try {
    const response = await fetch('/api/create-community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

export function ReviewForm(): JSX.Element {
  const router = useRouter()
  const {
    deployedDao,
    ipfsUpload,
    orderedLayers,
    setFulfilledSections,
    resetForm,
    general,
  } = useFormStore()

  const methods = useForm()

  const chain = getChainId('goerli')

  const { data: tokenOwner } = useContractRead({
    enabled: !!deployedDao.token,
    abi: tokenAbi,
    address: deployedDao.token as `0x${string}`,
    chainId: chain,
    functionName: 'owner',
  })

  const { handleSubmit } = methods

  const [deploymentError, setDeploymentError] = useState<string | undefined>()
  const [isPendingTransaction, setIsPendingTransaction] =
    useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { wallet: activeWallet } = usePrivyWagmi()

  const transactions = useMemo(() => {
    if (!orderedLayers || !ipfsUpload) return []
    return transformFileProperties(orderedLayers, ipfsUpload, 500)
  }, [orderedLayers, ipfsUpload])

  const handleDeployMetadata = async () => {
    setIsLoading(true)
    setDeploymentError(undefined)

    if (!transactions || !deployedDao.metadata) {
      setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      return
    }

    if (tokenOwner !== activeWallet?.address) {
      setDeploymentError(DEPLOYMENT_ERROR.MISMATCHING_SIGNER)
      return
    }

    setIsPendingTransaction(true)
    for await (const transaction of transactions) {
      try {
        const config = await prepareWriteContract({
          abi: metadataAbi,
          address: deployedDao.metadata as `0x${string}`,
          functionName: 'addProperties',
          chainId: chain,
          args: [transaction.names, transaction.items, transaction.data],
        })
        const tx = await writeContract(config)
        await waitForTransaction({ hash: tx.hash })
      } catch (err) {
        console.warn(err)
        setIsPendingTransaction(false)
        return
      }
    }

    setIsPendingTransaction(false)
    setFulfilledSections('Deployed')

    // MODIFY CHAIN TO BE DYNAMIC....!!!!
    // Pushes users to commyunity token address
    try {
      toast.remove()
      toast.success('DAO Deployed!')
      setIsLoading(false)

      createCommunity({
        name: general.daoName,
        community_id: deployedDao.token,
        network: 'goerli',
      })

      router.push(`/community/goerli/${deployedDao.token}/`)
      setTimeout(() => {
        resetForm()
      }, 200)
    } catch {
      setIsLoading(false)
      toast.error('Deployment error, try again!')
    }
  }

  useEffect(() => {
    if (isPendingTransaction) {
      toast.dismiss()
      toast.loading('Deploying DAO...')
    }
    if (deploymentError) {
      toast.dismiss()
      toast.error(deploymentError)
      setIsLoading(false)
    }
  }, [isPendingTransaction, deploymentError])

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
            {Object.keys(deployedDao).map((key: string) => (
              <div className="w-full rounded-2xl bg-white p-4" key={key}>
                <Paragraph as="p5" className="w-full text-left font-semibold">
                  {key}
                </Paragraph>
                <div className="flex w-full justify-between truncate">
                  <Paragraph as="p3" className="max-w-[270px]">
                    {deployedDao[key as keyof typeof deployedDao]}
                  </Paragraph>
                  <button
                    type="button"
                    className=""
                    onClick={() => {
                      navigator.clipboard.writeText(
                        deployedDao[key as keyof typeof deployedDao] as string
                      )
                      toast.success('Address copied to clipboard!')
                    }}
                  >
                    <Copy />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <ContinueButton title="Confirm 2/2" loading={isLoading} />
        </div>
      </form>
    </FormProvider>
  )
}
