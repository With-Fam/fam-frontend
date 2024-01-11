import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Chain } from '@/types'
import { PUBLIC_DEFAULT_CHAINS } from '@/constants/defaultChains'

export interface ChainStoreProps {
  chain: Chain
  setChain: (chain: Chain) => void
}

export const CHAIN_STORE_IDENTIFIER = `nouns-builder-chain-${process.env.NEXT_PUBLIC_NETWORK_TYPE}`

export const useChainStore = create(
  persist<ChainStoreProps>(
    (set) => ({
      chain: PUBLIC_DEFAULT_CHAINS[0],
      setChain: (chain) => set({ chain }),
    }),
    {
      name: CHAIN_STORE_IDENTIFIER,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)
