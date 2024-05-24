import { Chain, PublicClient, createPublicClient, http } from 'viem'
import getViemNetwork from './getViemNetwork'
import { mapChainIdToEndpoint } from '@/utils/alchemy/mapChainIdToEndpoint'
import { CHAIN_ID } from '@/constants/defaultChains'

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId)
  const publicClient = createPublicClient({
    chain: chain as Chain,
    transport: http(mapChainIdToEndpoint(CHAIN_ID)),
  }) as PublicClient
  return publicClient
}
