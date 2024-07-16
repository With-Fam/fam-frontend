import { TransactionType } from '@/modules/create-activity/types'
import { Address } from 'viem'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'
import _get from 'lodash.get'
import { ZoraCreateValues } from '@/modules/create-activity/components/zora-create/ZoraCreateForm.schema'
import useCreateProposal from '@/hooks/useCreateProposal'
import { useCreateActivityProvider } from '@/contexts/CreateActivityProvider'

const useZoraCreateProposalForm = () => {
  const { community } = useParams()
  const { create } = useCreateProposal(community)
  const { setLoadingMessage, setLoading } = useCreateActivityProvider()
  const defaultValues = {
    target: community as Address,
    collectionImage: '',
    title: '',
    description: '',
    pricePerEdition: 0,
    duration: 7,
    payoutAddress: community as Address,
    customLimit: 1,
    customEditionSize: 1000,
  }

  const methods = useForm<ZoraCreateValues>({
    defaultValues: {
      collectionImage: defaultValues.collectionImage,
      title: defaultValues.title,
      description: defaultValues.description,
      pricePerEdition: defaultValues.pricePerEdition,
      duration: defaultValues.duration,
      payoutAddress: defaultValues.payoutAddress,
      customLimit: defaultValues.customLimit,
      customEditionSize: defaultValues.customEditionSize,
    },
  })

  const onSubmit = async (values: ZoraCreateValues) => {
    setLoading(true)
    const builderTransaction = {
      type: TransactionType.ZORA_CREATE,
      functionSignature: 'zoraCreate(address)',
      target: community as Address,
      value: '',
      collectionImage: values.collectionImage,
      title: values.title,
      description: values.description,
      pricePerEdition: values.pricePerEdition,
      duration: values.duration * 60 * 60 * 24,
      payoutAddress: values.payoutAddress,
      customLimit: values.customLimit,
      customEditionSize: values.customEditionSize,
      calldata: '0x',
    }

    const response = await create(builderTransaction)
    const { error } = response as any
    if (!error) setLoadingMessage('Proposal posted. Redirecting...')
    setLoading(false)
  }

  return {
    methods,
    onSubmit,
  }
}

export default useZoraCreateProposalForm
