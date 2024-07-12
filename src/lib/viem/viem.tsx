import { Chain, PublicClient, createPublicClient, http } from 'viem'
import getViemNetwork from './getViemNetwork'
import { mapChainIdToEndpoint } from '@/lib/alchemy/mapChainIdToEndpoint'
import { CHAIN_ID } from '@/constants/defaultChains'

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId)
  const publicClient = createPublicClient({
    chain: chain as Chain,
    transport: http(mapChainIdToEndpoint(CHAIN_ID)),
  }) as PublicClient
  return publicClient
}

export const getPublicClientWithoutAlchemy = (chainId: number) => {
  const chain = getViemNetwork(chainId)
  const publicClient = createPublicClient({
    chain: chain as Chain,
    transport: http(),
  }) as PublicClient
  return publicClient
}
