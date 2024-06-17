import { useProposalStore } from '@/modules/create-activity/stores'
import { TransactionType } from '@/modules/create-activity/types'
import { Address, zeroAddress } from 'viem'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'
import _get from 'lodash.get'
import { Transaction } from '@/modules/create-activity/stores'
import { ZoraCreateValues } from '@/modules/create-activity/components/zora-create/ZoraCreateForm.schema'

function hasChanged(
  values: ZoraCreateValues,
  previous: Pick<
    Transaction,
    | 'target'
    | 'collectionImage'
    | 'title'
    | 'description'
    | 'pricePerEdition'
    | 'duration'
    | 'payoutAddress'
  >
) {
  return (
    values.pricePerEdition !== previous.pricePerEdition ||
    values.collectionImage !== previous.collectionImage ||
    values.title !== previous.title ||
    values.description !== previous.description ||
    values.duration !== previous.duration ||
    values.payoutAddress !== previous.payoutAddress
  )
}

const useZoraCreateProposalForm = (callback: any) => {
  const { addTransaction, editTransaction, transactions } = useProposalStore()
  const exists = transactions.find(({ type }) => type === 'zora-create')
  const { community } = useParams()
  const defaultValues: Pick<
    Transaction,
    | 'target'
    | 'collectionImage'
    | 'title'
    | 'description'
    | 'pricePerEdition'
    | 'duration'
    | 'payoutAddress'
  > = _get(exists, 'transactions[0]', {
    target: community as Address,
    collectionImage: '',
    title: '',
    description: '',
    pricePerEdition: 0.0001,
    duration: 0,
    payoutAddress: community as Address,
  })

  const methods = useForm<ZoraCreateValues>({
    defaultValues: {
      collectionImage: defaultValues.collectionImage,
      title: defaultValues.title,
      description: defaultValues.description,
      pricePerEdition: defaultValues.pricePerEdition,
      duration: defaultValues.duration,
      payoutAddress: defaultValues.payoutAddress,
    },
  })
  const onSubmit = async (values: ZoraCreateValues) => {
    if (exists && defaultValues && !hasChanged(values, defaultValues)) {
      callback()
      return
    }

    const builderTransaction = {
      type: TransactionType.ZORA_CREATE,
      transactions: [
        {
          functionSignature: 'zoraCreate(address)',
          target: community as Address,
          value: '',
          collectionImage: values.collectionImage,
          title: values.title,
          description: values.description,
          pricePerEdition: values.pricePerEdition,
          duration: values.duration,
          payoutAddress: values.payoutAddress,
          calldata: '0x',
        },
      ],
    }

    if (exists) {
      const idx = transactions.indexOf(exists)
      editTransaction(idx, builderTransaction)
    } else {
      addTransaction(builderTransaction)
    }
    callback()
  }

  return {
    methods,
    onSubmit,
  }
}

export default useZoraCreateProposalForm
