import * as Yup from 'yup'
import {
  auctionSettingsValidationSchema,
  TokenAllocation,
} from '@/modules/create-community/components/auctions/AuctionForm.schema'

import { generalValidationSchema } from '@/modules/create-community/components/general/GeneralForm.schema'

import { Duration, Maybe } from '@/types'

import { Address } from 'wagmi'

export interface UpdateCommunityFormValues {
  daoAvatar?: string
  daoWebsite?: string
  projectDescription?: Maybe<string>
  // Not sure what this is
  // rendererBase: string
  auctionDuration: Duration
  auctionReservePrice: number
  proposalThreshold: number
  quorumThreshold: number
  votingPeriod: Duration
  votingDelay: Duration
  founderAllocation: TokenAllocation[]
  vetoPower: boolean
  vetoerAddress?: string
}

export const updateCommunitySchema = (
  address?: Address | null
): Yup.ObjectSchema<UpdateCommunityFormValues> =>
  auctionSettingsValidationSchema(address).concat(generalValidationSchema)
