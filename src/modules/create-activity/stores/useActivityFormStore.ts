'use client'
import { create } from 'zustand'

import { TransactionType } from '@/modules/create-activity/types'
import { Maybe } from '@/types'

export type FundraisingTargetValues = {
  amount: number
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
  resetForm: () => void
}

const initialState = {
  activeSection: 0,
  fulfilledSections: [],
  action: '',
  proposal: {
    title: '',
    summary: '',
  },
  activityType: null,
}

export interface ActivityFormStoreState {
  activeSection: number
  setActiveSection: (activeSection: number) => void
  activityType: Maybe<TransactionType>
  setActivityType: (activity: Maybe<TransactionType>) => void
  fulfilledSections: string[]
  setFulfilledSections: (section: string) => void
  resetForm: () => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useActivityFormStore = create<ActivityFormStoreState>((set) => ({
  ...initialState,
  setAction: (action) => set({ action }),
  setActiveSection: (next) => {
    const activeSection = next < 0 ? 0 : next
    return set({ activeSection })
  },
  setActivityType: (activityType: ActivityFormStoreState['activityType']) =>
    set({ activityType: activityType }),
  setFulfilledSections: (section) => {
    set((state) => ({
      fulfilledSections: !state.fulfilledSections.includes(section)
        ? [...state.fulfilledSections, section]
        : [...state.fulfilledSections],
    }))
  },
  resetForm: () => set({ ...initialState }),
}))
