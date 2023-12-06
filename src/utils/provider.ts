'use client'

import { JsonRpcProvider, AbstractProvider } from 'ethers'

import { RPC_URL } from '@/constants/rpc'
import { CHAIN_ID } from '@/types'

let providerMap: Map<CHAIN_ID, AbstractProvider>

export function getProvider(chainId: CHAIN_ID): AbstractProvider {
  if (!providerMap) providerMap = new Map()
  if (!providerMap.has(chainId)) {
    // Set polling to 0 as this won't change
    const defaultProvider = new JsonRpcProvider(RPC_URL[chainId])
    defaultProvider.pollingInterval = 0
    providerMap.set(chainId, defaultProvider)
  }
  return providerMap.get(chainId)!
}
