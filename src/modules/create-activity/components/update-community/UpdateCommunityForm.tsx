'use client'

// Third Parties
import { Address } from 'wagmi'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import _isEqual from 'lodash.isequal'
import { useEffect } from 'react'

// Components
import { UploadIPFSImage } from '@/components/ipfs/UploadIPFSImage'
import { TextArea, TextInput } from '@/components/forms'
import VetoManagement from '@/modules/create-community/components/auctions/VetoManagement'
import ContinueButton from '@/modules/ContinueButton'

// Types
import { FounderFieldArray } from '@/modules/create-community/components/auctions/FounderFieldArray'
import { Paragraph } from '@/stories'
import { TokenAllocation } from '@/modules/create-community/components/auctions/AuctionForm.schema'
import { TransactionType } from '@/modules/create-activity/types'
interface UpdateCommunityFormProps {
  callback: () => void
  collectionAddress: string
}

// Helpers
import useUpdateCommunityContracts from '@/modules/create-activity/components/update-community/useUpdateCommunityContracts'
import { formValuesToTransactionMap } from '@/modules/create-activity/utils'
import {
  generateInitialData,
  withPauseUnpause,
} from '@/modules/create-activity/components/update-community/helpers'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useDaoStore } from '@/modules/dao'
import {
  updateCommunitySchema,
  UpdateCommunityFormValues,
} from './UpdateCommunity.schema'
import {
  BuilderTransaction,
  useProposalStore,
} from '@/modules/create-activity/stores'
import { getEnsAddress } from '@/utils/ens'

export function UpdateCommunityForm({
  callback, // collectionAddress,
}: UpdateCommunityFormProps): JSX.Element {
  const createProposal = useProposalStore((state) => state.createProposal)
  const addresses = useDaoStore((state) => state.addresses)
  const data = useUpdateCommunityContracts() as any
  const initialValues = generateInitialData({ data })
  const { wagmiData } = useCheckAuth()
  const methods = useForm<UpdateCommunityFormValues>({
    resolver: yupResolver(updateCommunitySchema(wagmiData.address)) as any,
    defaultValues: initialValues,
  })

  const onSubmit = async (values: UpdateCommunityFormValues) => {
    let transactions: BuilderTransaction[] = []

    let field: keyof UpdateCommunityFormValues

    for (field in values) {
      let value = values[field]

      if (_isEqual(value, initialValues[field])) {
        continue
      }

      if (field === 'vetoerAddress') {
        value = await getEnsAddress(value as string)
      }

      if (field === 'founderAllocation') {
        value = (value as TokenAllocation[]).map(
          ({ founderAddress, allocationPercentage, endDate }) => ({
            founderAddress: founderAddress,
            allocationPercentage: allocationPercentage
              ? allocationPercentage
              : 0,
            endDate: Math.floor(new Date(endDate).getTime() / 1000),
          })
        )
      }

      const transactionProperties: any = formValuesToTransactionMap[field]
      if (!transactionProperties) {
        console.log('error with transaction format::', transactionProperties)
        return
      }
      const calldata = transactionProperties.constructCalldata(value)
      const target = transactionProperties.getTarget(addresses)

      if (target)
        transactions.push({
          type: TransactionType.CUSTOM,
          transactions: [
            {
              functionSignature: transactionProperties.functionSignature,
              target,
              calldata: calldata || '',
              value: '',
            },
          ],
        })

      // removes burnVetoer from the list of transactions if updateVetoer is present
      if (field === 'vetoerAddress') {
        transactions = transactions.filter(
          (tx: BuilderTransaction) =>
            tx.transactions[0].functionSignature !== 'burnVetoer'
        )
      }
      if (field === 'vetoPower') {
        transactions = transactions.filter(
          (tx: BuilderTransaction) =>
            tx.transactions[0].functionSignature !== 'updateVetoer'
        )
      }
    }

    const transactionsWithPauseUnpause = withPauseUnpause(
      transactions,
      addresses?.auction as Address
    )

    createProposal({
      disabled: false,
      title: undefined,
      summary: undefined,
      transactions: transactionsWithPauseUnpause,
    })
    callback()
  }

  const { control, handleSubmit } = methods

  useEffect(() => {
    if (
      initialValues.vetoerAddress !==
      methods.formState.defaultValues?.vetoerAddress
    ) {
      methods.reset(initialValues)
    }
  }, [initialValues, methods])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[668px]"
      >
        <Controller
          name="daoAvatar"
          control={control}
          render={({ field }) => (
            <UploadIPFSImage
              name={field.name}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <div className="mt-6 flex flex-col gap-4">
          <TextArea
            name="projectDescription"
            label="Description"
            placeholder="Tell the world about your project"
          />
          {/** Thoughts on having a smart input like Nouns? */}
          <TextInput
            name="daoWebsite"
            label="Website"
            placeholder="https://www.withfam.xyz"
          />
        </div>
        <div className="relative z-0 mt-6">
          <TextInput
            name="auctionReservePrice"
            type="number"
            step="0.01"
            label="Reserve price"
            placeholder="0.05 ETH"
          />
        </div>
        <Paragraph as="p4" className="text-left text-grey-dark">
          The founders can choose to receive a % of membership tokens until the
          specified end date. This ensures founders can have a greater influence
          when voting on community activities
        </Paragraph>
        <FounderFieldArray />
        <VetoManagement />
        <ContinueButton />
        <span className="hidden h-6 md:block" />
      </form>
    </FormProvider>
  )
}
