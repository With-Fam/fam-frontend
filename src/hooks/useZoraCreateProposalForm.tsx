import { TransactionType } from '@/modules/create-activity/types'
import { Address, maxUint64 } from 'viem'
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
    ipfsMedia: '',
    ipfsImage: '',
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
      ipfsMedia: defaultValues.ipfsMedia,
      ipfsImage: defaultValues.ipfsImage,
      title: defaultValues.title,
      description: defaultValues.description,
      pricePerEdition: defaultValues.pricePerEdition,
      duration: defaultValues.duration,
      payoutAddress: defaultValues.payoutAddress,
      customLimit: defaultValues.customLimit,
      customEditionSize: defaultValues.customEditionSize,
    },
  })

  const durationValue = (duration: number) => {
    const currentEpochTime = parseInt(Number(Date.now() / 1000).toFixed(0))
    switch (duration) {
      case 1:
        return currentEpochTime + 1 * 60 * 60 * 24
      case 2:
        return currentEpochTime + 7 * 60 * 60 * 24
      case 3:
        return currentEpochTime + 30 * 60 * 60 * 24
      case 4:
        return currentEpochTime + 3 * 30 * 60 * 60 * 24
      case 5:
        return currentEpochTime + 6 * 30 * 60 * 60 * 24
      case 6:
        return maxUint64
    }
  }

  const onSubmit = async (values: ZoraCreateValues) => {
    setLoading(true)
    const builderTransaction = {
      type: TransactionType.ZORA_CREATE,
      functionSignature: 'zoraCreate(address)',
      target: community as Address,
      value: '',
      ipfsImage: values.ipfsImage,
      ipfsMedia: values.ipfsMedia,
      title: values.title,
      description: values.description,
      pricePerEdition: values.pricePerEdition,
      duration: durationValue(values.duration),
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
