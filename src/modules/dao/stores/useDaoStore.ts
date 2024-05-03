import { create } from 'zustand'

import { AddressType } from '@/types'

export interface DaoContractAddresses {
  token?: AddressType
  metadata?: AddressType
  auction?: AddressType
  treasury?: AddressType
  governor?: AddressType
}

export interface DaoContracts {
  tokenContract?: any
  metadataContract?: any
  auctionContract?: any
  treasuryContract?: any
  governorContract?: any
}

export interface DaoStoreProps {
  addresses: DaoContractAddresses
  setAddresses: (addresses: DaoContractAddresses) => void
}

export const useDaoStore = create<DaoStoreProps>((set) => ({
  addresses: {
    token: undefined,
    metadata: undefined,
    auction: undefined,
    treasury: undefined,
    governor: undefined,
  },
  setAddresses: (addresses: DaoContractAddresses) => set({ addresses }),
}))
