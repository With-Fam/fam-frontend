'use client'

import { PUBLIC_DEFAULT_CHAINS } from '@/constants/defaultChains'
import { CHAIN_STORE_IDENTIFIER } from '@/lib/stores/useChainStore'
import { Chain } from '@/types'

// TEMP REPLACE WITH OG
export const getChainFromLocalStorage = (): Chain => {
  const rawChain = localStorage.getItem(CHAIN_STORE_IDENTIFIER)
  return rawChain
    ? JSON.parse(rawChain)?.state?.chain
    : PUBLIC_DEFAULT_CHAINS[0]
}
