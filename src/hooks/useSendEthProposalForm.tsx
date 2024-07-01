'use client'

import { useForm } from 'react-hook-form'
import { Address } from 'viem'
import _get from 'lodash.get'
import { TransactionType } from '@/modules/create-activity/types'
import { walletSnippet } from '@/lib/helpers'
import { AddressType } from '@/types'
import { SendEthValues } from '@/modules/create-activity/components/send-eth/SendEthForm.schema'
import getEnsAddress from '@/lib/getEnsAddress'
import useCreateProposal from '@/hooks/useCreateProposal'
import { useCreateActivityProvider } from '@/contexts/CreateActivityProvider'
import { useParams } from 'next/navigation'
import handleTxError from '@/lib/handleTxError'

const useSendEthProposalForm = () => {
  const { community } = useParams()
  const { setLoadingMessage, setLoading } = useCreateActivityProvider()
  const { create } = useCreateProposal(community)
  const defaultValues = {
    target: '' as AddressType,
    value: '0.000001',
  }

  const methods = useForm<SendEthValues>({
    defaultValues: {
      recipientAddress: defaultValues.target,
      amount: Number(defaultValues.value),
    },
  })
  const onSubmit = async (values: SendEthValues) => {
    if (!(values.amount && values.recipientAddress)) return
    if (values.amount <= 0) {
      handleTxError({ message: 'Amount must be greater than zero.' })
      return
    }
    setLoading(true)
    const ensAddress = await getEnsAddress(values.recipientAddress)
    const target = (ensAddress || values.recipientAddress) as Address
    const value = values.amount.toString()

    const builderTransaction = {
      type: TransactionType.SEND_ETH,
      summary: `Send ${value} ETH to ${walletSnippet(target)}`,
      functionSignature: 'sendEth(address)',
      target,
      value,
      calldata: '0x',
    }

    const response = await create(builderTransaction)
    setLoading(false)
    const { error } = response as any
    if (!error) setLoadingMessage('Proposal posted. Redirecting...')
  }
  const { handleSubmit } = methods

  return {
    methods,
    handleSubmit,
    onSubmit,
  }
}

export default useSendEthProposalForm
