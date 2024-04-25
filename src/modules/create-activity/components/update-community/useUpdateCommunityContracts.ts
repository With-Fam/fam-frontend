import { useChainStore } from '@/utils/stores/useChainStore'
import { Address, useContractReads } from 'wagmi'
import { useDaoStore } from '@/modules/dao'
import {
  auctionAbi,
  governorAbi,
  metadataAbi,
  tokenAbi,
} from '@/data/contract/abis'

const useUpdateCommunityContracts = () => {
  const addresses = useDaoStore((state) => state.addresses)
  const { id: chainId } = useChainStore((x) => x.chain)

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction as Address,
  }

  const governorContractParams = {
    abi: governorAbi,
    address: addresses?.governor as Address,
  }

  const metadataContractParams = {
    abi: metadataAbi,
    address: addresses?.metadata as Address,
  }

  const tokenContractParams = {
    abi: tokenAbi,
    address: addresses?.token as Address,
  }

  const { data } = useContractReads({
    allowFailure: false,
    contracts: [
      {
        ...auctionContractParams,
        chainId,
        functionName: 'duration',
      },
      {
        ...auctionContractParams,
        chainId,
        functionName: 'reservePrice',
      },
      {
        ...governorContractParams,
        chainId,
        functionName: 'vetoer',
      },
      {
        ...governorContractParams,
        chainId,
        functionName: 'votingPeriod',
      },
      {
        ...governorContractParams,
        chainId,
        functionName: 'votingDelay',
      },
      {
        ...governorContractParams,
        chainId,
        functionName: 'quorumThresholdBps',
      },
      {
        ...governorContractParams,
        chainId,
        functionName: 'proposalThresholdBps',
      },
      {
        ...metadataContractParams,
        chainId,
        functionName: 'contractImage',
      },
      {
        ...metadataContractParams,
        chainId,
        functionName: 'projectURI',
      },
      {
        ...metadataContractParams,
        chainId,
        functionName: 'description',
      },
      {
        ...tokenContractParams,
        chainId,
        functionName: 'getFounders',
      },
    ] as any,
  })

  return data
}

export default useUpdateCommunityContracts
