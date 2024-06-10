'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IPFSUpload } from '@/hooks'
import type { DaoContractAddresses } from '@/modules/dao'
import { FormStoreState, AuctionSettingsFormValues } from './types'
import { ArtworkFormValues, GeneralFormValues } from '../components'
import { TokenAllocation } from '@/modules/create-community/components/auctions/AuctionForm.schema'
import type { OrderedTraits } from '@/components/create-community/artwork/TraitsAccordian'
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
      setVotePeriod: (votePeriod: number) => set({ votePeriod }),
      setShowAdvanced: (showAdvanced: boolean) => set({ showAdvanced }),
      setVetoPower: (vetoPower: boolean) => set({ vetoPower }),
      setVetoerAddress: (vetoerAddress: string) => set({ vetoerAddress }),
      setFounderAllocation: (founderAllocation: Array<TokenAllocation>) =>
        set({ founderAllocation }),
      setContributionAllocation: (
        contributionAllocation: Array<TokenAllocation>
      ) => set({ contributionAllocation }),
      setReservePrice: (
        auctionReservePrice: AuctionSettingsFormValues['auctionReservePrice']
      ) =>
        set({
          auctionSettings: {
            ...auctionSettingsDefaultValues,
            auctionReservePrice,
          },
        }),
      setSetUpArtwork: (artwork: ArtworkFormValues) =>
        set({ setUpArtwork: artwork }),
      setIpfsUpload: (ipfsUpload: IPFSUpload[]) => set({ ipfsUpload }),
      setDeployedDao: (deployedDao: DaoContractAddresses) => {
        set({
          deployedDao,
        })
      },
      setOrderedLayers: (orderedLayers: OrderedTraits) => {
        set({
          orderedLayers,
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
