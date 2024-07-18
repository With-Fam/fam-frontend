'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { DaoContractAddresses } from './types'
import { FormStoreState, AuctionSettingsFormValues } from './types'
import { GeneralFormValues } from '../components'
import { auctionSettingsDefaultValues, initialState } from './variables'
import { MembershipFormValues } from '@/modules/create-community/components/membership/MembershipForm.schema'

export const useFormStore = create(
  persist<FormStoreState>(
    (set) => ({
      ...initialState,
      setActiveSection: (next) => {
        const activeSection = next < 0 ? 0 : next
        return set({ activeSection })
      },
      setFulfilledSections: (section: string) => {
        set((state) => ({
          fulfilledSections: !state.fulfilledSections.includes(section)
            ? [...state.fulfilledSections, section]
            : [...state.fulfilledSections],
        }))
      },
      setGeneral: (general: GeneralFormValues) => set({ general }),
      setMembership: (membership: MembershipFormValues) => set({ membership }),
      setVetoPeriod: (vetoPeriod: number) => set({ vetoPeriod }),
      setShowAdvanced: (showAdvanced: boolean) => set({ showAdvanced }),
      setVetoPower: (vetoPower: boolean) => set({ vetoPower }),
      setVetoerAddress: (vetoerAddress: string) => set({ vetoerAddress }),
      setReservePrice: (
        auctionReservePrice: AuctionSettingsFormValues['auctionReservePrice']
      ) =>
        set({
          auctionSettings: {
            ...auctionSettingsDefaultValues,
            auctionReservePrice,
          },
        }),
      setDeployedDao: (deployedDao: DaoContractAddresses) => {
        set({
          deployedDao,
        })
      },
      setIsUploadingToIPFS: (isUploadingToIPFS: boolean) =>
        set({ isUploadingToIPFS }),
      resetForm: () => set({ ...initialState }),
      auctionSettings: auctionSettingsDefaultValues,
    }),
    {
      name: `fam-community-create-${process.env.NEXT_PUBLIC_NETWORK_TYPE}`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)
