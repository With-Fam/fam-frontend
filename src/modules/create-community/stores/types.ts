// Third Parties
import { StateCreator } from 'zustand'
import { PersistOptions } from 'zustand/middleware'

// Hooks
import { IPFSUpload } from '@/hooks'

// Types
import { DaoContractAddresses } from '@/modules/create-community'
import { GeneralFormValues, ArtworkFormValues } from '../components'
import { TokenAllocation } from '@/modules/create-community/components/auctions/schema'
import type { OrderedTraits } from '@/components/create-community/artwork/TraitsAccordian'

/*--------------------------------------------------------------------*/

/**
 * Types
 */

export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export interface AuctionSettingsFormValues {
  auctionDuration: Duration
  auctionReservePrice?: number
  proposalThreshold?: number
  quorumThreshold?: number
  votingPeriod: Duration
  votingDelay: Duration
}

export interface FormStoreState {
  activeSection: number
  setActiveSection: (activeSection: number) => void
  fulfilledSections: string[]
  setFulfilledSections: (section: string) => void
  general: GeneralFormValues
  setGeneral: (general: GeneralFormValues) => void
  vetoPower: boolean | undefined
  setVetoPower: (vetoPower: boolean) => void
  vetoerAddress: string
  setVetoerAddress: (vetoerAddress: string) => void
  founderAllocation: Array<TokenAllocation>
  setFounderAllocation: (founderAllocation: Array<TokenAllocation>) => void
  contributionAllocation: Array<TokenAllocation>
  setContributionAllocation: (
    contributionAllocation: Array<TokenAllocation>
  ) => void
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
}

export type FixedPersist = (
  config: StateCreator<FormStoreState>,
  options: PersistOptions<FormStoreState>
) => StateCreator<FormStoreState>
