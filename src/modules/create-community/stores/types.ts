import { StateCreator } from 'zustand'
import { PersistOptions } from 'zustand/middleware'
import { IPFSUpload } from '@/hooks'
import type { OrderedTraits } from '@/components/create-community/artwork/TraitsAccordian'
import { GeneralFormValues, ArtworkFormValues } from '../components'
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
  votingPeriod: Duration
  votingDelay: Duration
  executionDelay: number
}

export interface FormStoreState {
  activeSection: number
  setActiveSection: (activeSection: number) => void
  fulfilledSections: string[]
  setFulfilledSections: (section: string) => void
  general: GeneralFormValues
  votePeriod: number
  setVotePeriod: (votePeriod: number) => void
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
  setUpArtwork: ArtworkFormValues
  setSetUpArtwork: (artwork: ArtworkFormValues) => void
  ipfsUpload: IPFSUpload[]
  setIpfsUpload: (ipfsUpload: IPFSUpload[]) => void
  deployedDao: DaoContractAddresses
  setDeployedDao: (deployedDao: DaoContractAddresses) => void
  orderedLayers: OrderedTraits
  setOrderedLayers: (orderedLayers: OrderedTraits) => void
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
