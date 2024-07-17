import { StateCreator } from 'zustand'
import { PersistOptions } from 'zustand/middleware'

import { GeneralFormValues } from '../components'
import { MembershipFormValues } from '@/modules/create-community/components/membership/MembershipForm.schema'
import { Address } from 'viem'

export interface DaoContractAddresses {
  token?: Address
  metadata?: Address
  auction?: Address
  treasury?: Address
  governor?: Address
}

export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export interface AuctionSettingsFormValues {
  auctionDuration: Duration
  auctionReservePrice?: number
  proposalThreshold: number
  quorumThreshold?: number
  vetoPeriod: Duration
  votingDelay: Duration
  executionDelay: number
}

export interface FormStoreState {
  activeSection: number
  setActiveSection: (activeSection: number) => void
  fulfilledSections: string[]
  setFulfilledSections: (section: string) => void
  general: GeneralFormValues
  vetoPeriod: number
  setVetoPeriod: (vetoPeriod: number) => void
  membership: MembershipFormValues
  setGeneral: (general: GeneralFormValues) => void
  setMembership: (membership: MembershipFormValues) => void
  vetoPower: boolean | undefined
  setVetoPower: (vetoPower: boolean) => void
  vetoerAddress: string
  setVetoerAddress: (vetoerAddress: string) => void
  auctionSettings: AuctionSettingsFormValues
  setReservePrice: (
    auctionReservePrice: AuctionSettingsFormValues['auctionReservePrice']
  ) => void
  deployedDao: DaoContractAddresses
  setDeployedDao: (deployedDao: DaoContractAddresses) => void
  isUploadingToIPFS: boolean
  setIsUploadingToIPFS: (bool: boolean) => void
  resetForm: () => void
  showAdvanced: boolean
  setShowAdvanced: (showAdvanced: boolean) => void
}

export type FixedPersist = (
  config: StateCreator<FormStoreState>,
  options: PersistOptions<FormStoreState>
) => StateCreator<FormStoreState>
