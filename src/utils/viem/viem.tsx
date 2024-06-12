import { Chain, PublicClient, createPublicClient, http } from 'viem'
import getViemNetwork from './getViemNetwork'
import { mapChainIdToEndpoint } from '@/utils/alchemy/mapChainIdToEndpoint'
import { CHAIN_ID } from '@/constants/defaultChains'

export const getPublicClient = (
  chainId: number,
  shouldBeUseAlchemy: boolean = true
) => {
  const RPC_URL = shouldBeUseAlchemy
    ? http(mapChainIdToEndpoint(CHAIN_ID))
    : http()

  const chain = getViemNetwork(chainId)
  const publicClient = createPublicClient({
    chain: chain as Chain,
    transport: RPC_URL,
  }) as PublicClient
  return publicClient
}
