import { FounderFormValues } from '@/modules/create-community/components/auctions/AuctionForm.schema'
import {
  ArtworkFormValues,
  GeneralFormValues,
} from '@/modules/create-community'

import { AuctionSettingsFormValues } from './types'
/*--------------------------------------------------------------------*/

/**
 * Variables
 */

export const auctionSettingsDefaultValues: AuctionSettingsFormValues = {
  auctionDuration: {
    seconds: 0,
    days: 1,
    hours: 0,
    minutes: 0,
  },
  auctionReservePrice: 0,
  executionDelay: 24,
  proposalThreshold: 5,
  quorumThreshold: 10,
  votingPeriod: {
    seconds: 0,
    days: 1,
    hours: 0,
    minutes: 0,
  },
  votingDelay: { seconds: 0, days: 0, hours: 0, minutes: 5 },
}

export const initialState = {
  activeSection: 0,
  fulfilledSections: [],
  general: {
    daoAvatar: '',
    daoDescription: '',
    daoName: '',
    daoSymbol: '',
    daoWebsite: '',
  } as GeneralFormValues,
  auctionSettings: auctionSettingsDefaultValues as AuctionSettingsFormValues,
  founderAllocation: [] as FounderFormValues['founderAllocation'],
  contributionAllocation: [],
  vetoPower: undefined,
  vetoerAddress: '',
  setUpArtwork: {
    projectDescription: '',
    artwork: [],
    collectionName: '',
    externalUrl: '',
    filesLength: 0,
  } as ArtworkFormValues,
  ipfsUpload: [],
  orderedLayers: [],
  isUploadingToIPFS: false,
  deployedDao: {
    token: undefined,
    metadata: undefined,
    auction: undefined,
    treasury: undefined,
    governor: undefined,
  },
  membership: {
    membershipPrice: 0.0001,
    mintPeriod: 5,
    revenueSplit: 10,
    founders: [],
    threshold: 25,
  },
  votePeriod: 8 * 3600,
  showAdvanced: false,
}
