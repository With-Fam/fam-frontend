import { useContractReads } from 'wagmi'

import { governorAbi, tokenAbi } from '@/data/contract/abis'
import { AddressType, CHAIN_ID, Maybe } from '@/types'

function isNil(value?: Maybe<unknown>) {
  return value == null
}

type UseVotesHook = {
  isDelegating?: boolean
  isLoading: boolean
  isOwner: boolean
  hasThreshold: boolean
  proposalVotesRequired?: bigint
}

export const useVotes = ({
  chainId,
  collectionAddress,
  governorAddress,
  signerAddress,
}: {
  chainId: CHAIN_ID
  collectionAddress?: AddressType
  governorAddress?: AddressType
  signerAddress?: AddressType
}): UseVotesHook => {
  const { data, isLoading } = useContractReads({
    enabled: !!collectionAddress && !!governorAddress && !!signerAddress,
    allowFailure: false,
    keepPreviousData: true,
    contracts: [
      {
        address: collectionAddress as AddressType,
        abi: tokenAbi,
        functionName: 'getVotes',
        args: [signerAddress as AddressType],
        chainId,
      },
      {
        address: collectionAddress as AddressType,
        abi: tokenAbi,
        functionName: 'delegates',
        args: [signerAddress as AddressType],
        chainId,
      },
      {
        address: governorAddress as AddressType,
        abi: governorAbi,
        functionName: 'proposalThreshold',
        chainId,
      },
    ] as const,
  })

  if (!data || isLoading || data.some(isNil)) {
    return {
      isLoading,
      isOwner: false,
      hasThreshold: false,
    }
  }

  const [votes, delegates, proposalThreshold] = data

  return {
    isLoading,
    isDelegating: delegates !== signerAddress,
    isOwner: votes > 0,
    hasThreshold: votes > proposalThreshold,
    proposalVotesRequired: proposalThreshold + BigInt(1),
  }
}
