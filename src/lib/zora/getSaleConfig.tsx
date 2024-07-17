import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/lib/viem'
import {
  zoraCreatorFixedPriceSaleStrategyABI,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from '@zoralabs/protocol-deployments'
import { Address } from 'viem'

const getSaleConfig = async (collectionAddress: Address, tokenId: any) => {
  const publicClient = getPublicClient(CHAIN_ID)
  const response = await publicClient.readContract({
    address: zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
    abi: zoraCreatorFixedPriceSaleStrategyABI,
    functionName: 'sale',
    args: [collectionAddress, tokenId],
  })

  return response
}

export default getSaleConfig
