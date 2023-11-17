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
  proposalThreshold: 0.1,
  quorumThreshold: 10,
  votingPeriod: {
    seconds: 0,
    days: 1,
    hours: 0,
    minutes: 0,
  },
  votingDelay: { seconds: 0, days: 0, hours: 0, minutes: 9 },
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
  },
  auctionSettings: auctionSettingsDefaultValues,
  founderAllocation: [],
  contributionAllocation: [],
  vetoPower: undefined,
  vetoerAddress: '',
  setUpArtwork: {
    artwork: [],
    collectionName: '',
    externalUrl: '',
    filesLength: 0,
  },
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
}
