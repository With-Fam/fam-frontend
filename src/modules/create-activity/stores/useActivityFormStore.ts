'use client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { GeneralActivityValues } from '@/modules/create-activity/components/general/schema'

export type FundraisingTargetValues = {
  amount: number
  // number or date?
  votingPeriod: number
  hosts: string[]
}

export interface ActivityFormStoreState {
  activeSection: number
  setActiveSection: (activeSection: number) => void
  action: string
  setAction: (action: string) => void
  fulfilledSections: string[]
  setFulfilledSections: (section: string) => void
  general: GeneralActivityValues
  setGeneral: (general: GeneralActivityValues) => void
  fundraising: FundraisingTargetValues
  setFundraising: (fundraising: FundraisingTargetValues) => void
  resetForm: () => void
}

const initialState = {
  activeSection: 0,
  fulfilledSections: [],
  action: '',
  general: {
    activityName: '',
    activityDescription: '',
  },
  activityType: '',
  fundraising: {
    amount: 0,
    votingPeriod: 7,
    hosts: [],
  },
}

export interface ActivityFormStoreState {
  activeSection: number
  setActiveSection: (activeSection: number) => void
  activityType: string
  setActivityType: (activity: string) => void
  fulfilledSections: string[]
  setFulfilledSections: (section: string) => void
  fundraising: FundraisingTargetValues
  setFundraising: (fundraising: FundraisingTargetValues) => void
  general: GeneralActivityValues
  setGeneral: (general: GeneralActivityValues) => void
  resetForm: () => void
}

type Params = {
  communityId: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useActivityFormStore = ({ communityId }: Params) =>
  create(
    persist<ActivityFormStoreState>(
      (set) => ({
        ...initialState,
        setAction: (action) => set({ action }),
        setActiveSection: (next) => {
          const activeSection = next < 0 ? 0 : next
          return set({ activeSection })
        },
        setActivityType: (activityType) => set({ activityType }),
        setFulfilledSections: (section) => {
          set((state) => ({
            fulfilledSections: !state.fulfilledSections.includes(section)
              ? [...state.fulfilledSections, section]
              : [...state.fulfilledSections],
          }))
        },
        setFundraising: (fundraising) => set({ fundraising }),
        setGeneral: (general) => set({ general }),
        resetForm: () => set({ ...initialState }),
      }),
      {
        name: `fam-${communityId}-activity-create-${process.env.NEXT_PUBLIC_NETWORK_TYPE}`,
        storage: createJSONStorage(() => localStorage),
        version: 0,
      }
    )
  )
