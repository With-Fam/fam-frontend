import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAccount, useContractRead } from 'wagmi'
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import ContinueButton from '@/modules/ContinueButton'
import { useFormStore } from '@/modules/create-community'
import { transformFileProperties } from '@/utils/transformFileProperties'
import { metadataAbi, tokenAbi } from '@/data/contract/abis'
import { useDaoStore } from '@/modules/dao'

import schema, { type ReviewFormValues } from './schema'

const DEPLOYMENT_ERROR = {
  MISMATCHING_SIGNER:
    'Oops, it looks like the owner of the token contract differs from your signer address. Please ensure that this transaction is handled by the same address.',
  GENERIC:
    'Oops! Looks like there was a problem. Please ensure that your input data is correct',
}

export function ReviewForm(): JSX.Element {
  const {
    deployedDao,
    // general,
    ipfsUpload,
    orderedLayers,
    setFulfilledSections,
    // resetForm,
  } = useFormStore()

  const methods = useForm<ReviewFormValues>({
    resolver: zodResolver(schema),
  })

  const chain = 5 //useChainStore((x) => x.chain) - TODO: get chain from store???

  console.log('ReviewForm::', deployedDao.token)

  const { data: tokenOwner } = useContractRead({
    enabled: !!deployedDao.token,
    abi: tokenAbi,
    address: deployedDao.token,
    chainId: chain,
    functionName: 'owner',
  })

  console.log('deployedDao.token', deployedDao)

  const { handleSubmit } = methods

  const [deploymentError, setDeploymentError] = useState<string | undefined>()
  const [isPendingTransaction, setIsPendingTransaction] =
    useState<boolean>(false)
  const { addresses } = useDaoStore()
  const { address } = useAccount()

  const transactions = useMemo(() => {
    if (!orderedLayers || !ipfsUpload) return []
    return transformFileProperties(orderedLayers, ipfsUpload, 500)
  }, [orderedLayers, ipfsUpload])

  console.log('what is transactions', transactions)

  const handleDeployMetadata = async () => {
    console.log('HIT')
    setDeploymentError(undefined)

    if (!transactions || !deployedDao.metadata) {
      console.log('error::', transactions, addresses.metadata)
      setDeploymentError(DEPLOYMENT_ERROR.GENERIC)
      return
    }

    if (tokenOwner !== address) {
      console.log('MISMATCHING_SIGNER', tokenOwner, address)
      setDeploymentError(DEPLOYMENT_ERROR.MISMATCHING_SIGNER)
      return
    }

    setIsPendingTransaction(true)
    console.log('pre loop')
    for await (const transaction of transactions) {
      console.log('inside map function')
      try {
        const config = await prepareWriteContract({
          abi: metadataAbi,
          address: deployedDao.metadata,
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

    console.log('BIG Success')
    console.log('WE DONE.')

    // router.push(`/dao/${chain.slug}/${token}`).then(() => {
    //   resetForm()
    // })
  }

  // const onSubmit = (values: ReviewFormValues) => {
  //   console.log('whats good.')
  //   console.log('ReviewForm::', values)
  //   handleDeployMetadata()
  // }

  if (deploymentError) toast.error(deploymentError)
  if (isPendingTransaction) toast.loading('Deploying DAO...')
  if (!isPendingTransaction && !deploymentError) {
    toast.remove()
    toast.success('DAO Deployed!')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleDeployMetadata)}>
        <div className="mx-auto max-w-md rounded-lg p-6">
          <div className="mb-4 flex items-center text-green-600">
            <svg
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-bold text-black">
              Successfully deployed contracts
            </span>
          </div>

          <div className="space-y-2">
            {Object.keys(deployedDao).map((key: string) => (
              <div
                className="shadow-xs mx-auto flex max-w-xl items-center justify-between rounded-lg bg-white p-4"
                key={key}
              >
                <span className="font-semibold">{key}</span>
                <br />
                <span className="truncate text-sm text-gray-500">
                  {deployedDao[key as keyof typeof deployedDao]}
                </span>
                <button className="rounded border border-gray-400 bg-transparent px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100">
                  {/* <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h2a2 2 0 0 1 2 2v10m0-12v-2a2 2 0 0 1 2-2h12"
                    ></path>
                  </svg> */}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => handleDeployMetadata()}>Deploy yo</button>
        <ContinueButton />
      </form>
    </FormProvider>
  )
}
