import { useForm } from 'react-hook-form'
import { Address } from 'viem'
import _get from 'lodash.get'
import { TransactionType } from '@/modules/create-activity/types'
import { ZoraCollectValues } from '@/modules/create-activity/components/zora-collect/ZoraCollectForm.schema'
import { useParams } from 'next/navigation'
import useCreateProposal from '@/hooks/useCreateProposal'
import { useCreateActivityProvider } from '@/contexts/CreateActivityProvider'

const useZoraCollectProposalForm = () => {
  const { setLoadingMessage, setLoading } = useCreateActivityProvider()
  const { community } = useParams()
  const { create } = useCreateProposal(community)
  const defaultValues = {
    target: community as Address,
    value: '' as Address,
    ethPrice: 0,
    tokenId: 1n,
  }

  const methods = useForm<ZoraCollectValues>({
    defaultValues: {
      tokenRecipient: defaultValues.target,
      collectionAddress: defaultValues.value as Address,
      ethPrice: defaultValues.ethPrice,
      tokenId: defaultValues.tokenId,
    },
  })

  const onSubmit = async (values: ZoraCollectValues) => {
    if (!(values.collectionAddress && values.tokenRecipient)) return
    setLoading(true)
    const target = values.tokenRecipient
    const value = values.collectionAddress
    const tokenId = values.tokenId
    const ethPrice = values.ethPrice

    const builderTransaction = {
      type: TransactionType.ZORA_COLLECT,
      functionSignature: 'zoraCollect(address)',
      target,
      value,
      tokenId,
      ethPrice,
      calldata: '0x',
    }

    const response = await create(builderTransaction)
    const { error } = response as any
    if (!error) {
      setLoadingMessage('Proposal posted. Redirecting...')
    }
    setLoading(false)
  }

  const { handleSubmit } = methods

  return {
    handleSubmit,
    methods,
    onSubmit,
  }
}

export default useZoraCollectProposalForm
