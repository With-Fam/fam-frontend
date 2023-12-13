'use client'

// Framework
import { MutableRefObject, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

// Third Parties
import { FormProvider, useForm } from 'react-hook-form'
const DescriptionEditor = dynamic(() => import('./DescriptionEditor'), {
  ssr: false,
}) // Quill library requires a dynamic import to not break SSR

// Schema and types
import schema, { ERROR_CODE, ReviewProposalFormValues } from './schema'

// Components
import TitleInput from '@/modules/create-activity/components/review-proposal/TitleInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddButton } from './AddButton'

// Chain
import { governorAbi, tokenAbi } from '@/data/contract/abis'
import { useDaoStore } from '@/modules/dao'
import { useChainStore } from '@/utils/stores/useChainStore'
import { useProposalStore } from '@/modules/create-activity/stores'
import { useAccount, useContractRead } from 'wagmi'
import { AddressType, Maybe } from '@/types'
import { prepareProposalTransactions } from '@/modules/create-activity/utils/prepareTransaction'
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'

type GeneralFormProps = {
  defaultValues: ReviewProposalFormValues
  formRef: MutableRefObject<Maybe<HTMLFormElement>>
  // onSubmit: (_a: ReviewProposalFormValues) => void
}

export function ReviewProposalForm({
  defaultValues,
  formRef,
  // onSubmit,
}: GeneralFormProps): JSX.Element {
  const methods = useForm<ReviewProposalFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  })
  const { handleSubmit } = methods

  const addresses = useDaoStore((state) => state.addresses)
  const chain = useChainStore((x) => x.chain)
  const { address } = useAccount()
  const { transactions, clearProposal } = useProposalStore()

  const [error, setError] = useState<string | undefined>()
  // const [simulationError, setSimulationError] = useState<string | undefined>()
  // const [simulating, setSimulating] = useState<boolean>(false)
  // const [simulations, setSimulations] = useState<Array<Simulation>>([])
  const [proposing, setProposing] = useState<boolean>(false)

  const { data: votes, isLoading } = useContractRead({
    address: addresses?.token as AddressType,
    abi: tokenAbi,
    enabled: !!address,
    functionName: 'getVotes',
    chainId: chain.id,
    args: [address as AddressType],
  })

  const { data: proposalThreshold, isLoading: thresholdIsLoading } =
    useContractRead({
      address: addresses?.governor as AddressType,
      chainId: chain.id,
      abi: governorAbi,
      functionName: 'proposalThreshold',
    })

  const onSubmit = useCallback(
    async (values: ReviewProposalFormValues) => {
      setError(undefined)
      // setSimulationError(undefined)
      // setSimulations([])

      if (proposalThreshold === undefined) return

      const votesToNumber = votes ? Number(votes) : 0
      const doesNotHaveEnoughVotes = votesToNumber <= Number(proposalThreshold)
      if (doesNotHaveEnoughVotes) {
        setError(ERROR_CODE.NOT_ENOUGH_VOTES)
        return
      }

      const {
        targets,
        values: transactionValues,
        calldata,
      } = prepareProposalTransactions(transactions)

      // if (!!CHAINS_TO_SIMULATE.find((x) => x === chain.id)) {
      //   let simulationResults

      //   try {
      //     setSimulating(true)

      //     simulationResults = await axios
      //       .post<SimulationResult>('/api/simulate', {
      //         treasuryAddress: addresses?.treasury,
      //         chainId: chain.id,
      //         calldatas: calldata,
      //         values: transactionValues.map((x) => x.toString()),
      //         targets,
      //       })
      //       .then((res) => res.data)
      //   } catch (err) {
      //     if (axios.isAxiosError(err)) {
      //       const data = err.response?.data as ErrorResult
      //       setSimulationError(data.error)
      //       logError(err)
      //     } else {
      //       logError(err)
      //       setSimulationError(
      //         'Unable to simulate transactions on DAO create form'
      //       )
      //     }
      //     return
      //   } finally {
      //     setSimulating(false)
      //   }
      //   const simulationFailed = simulationResults?.success === false
      //   if (simulationFailed) {
      //     const failed =
      //       simulationResults?.simulations.filter(
      //         ({ success }) => success === false
      //       ) || []
      //     setSimulations(failed)
      //     return
      //   }
      // }

      try {
        const params = {
          targets: targets,
          values: transactionValues,
          calldatas: calldata as Array<AddressType>,
          description: values.title + '&&' + values.summary,
        }

        const config = await prepareWriteContract({
          abi: governorAbi,
          functionName: 'propose',
          address: addresses?.governor as AddressType,
          chainId: chain.id,
          args: [
            params.targets,
            params.values,
            params.calldatas,
            params.description,
          ],
        })

        const { hash } = await writeContract(config)

        setProposing(true)
        await waitForTransaction({ hash })
      } catch (err: any) {
        setProposing(false)
        if (err.code === 'ACTION_REJECTED') {
          setError(ERROR_CODE.REJECTED)
          return
        }
        setError(err.message)
      }
    },
    [addresses, proposalThreshold, votes, clearProposal, chain.id, transactions]
  )

  // if (isLoading || thresholdIsLoading) return null

  const tokensNeeded =
    proposalThreshold !== undefined ? Number(proposalThreshold) + 1 : undefined

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-2xl grow flex-col"
      >
        <div className="flex grow flex-col">
          <div className="order-1 sm:order-2">
            <TitleInput
              name="title"
              placeholder="Title"
              className="block w-full text-lg outline-0"
            />
          </div>
          <DescriptionEditor name="summary" placeholder="Description" />
        </div>
        <AddButton />
      </form>
    </FormProvider>
  )
}
