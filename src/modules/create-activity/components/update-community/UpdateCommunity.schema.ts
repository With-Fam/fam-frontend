import * as Yup from 'yup'
import {
  auctionSettingsValidationSchema,
  TokenAllocation,
} from '@/modules/create-community/components/auctions/AuctionForm.schema'

import { Duration, Maybe } from '@/types'

import { Address } from 'wagmi'
import { urlValidationSchema } from '@/utils/yup'

interface BaseCommunitySchema {
  daoAvatar?: string
  daoWebsite?: string
  projectDescription?: Maybe<string>
}

export interface UpdateCommunityFormValues extends BaseCommunitySchema {
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

const baseCommunitySchema: Yup.ObjectSchema<BaseCommunitySchema> = Yup.object({
  daoAvatar: Yup.string().optional(),
  // Check max limit
  projectDescription: Yup.string().required('*').max(5000, '< 5000 characters'),
  daoWebsite: urlValidationSchema,
})

export const updateCommunitySchema = (
  address?: Address | null
): Yup.ObjectSchema<UpdateCommunityFormValues> =>
  auctionSettingsValidationSchema(address).concat(baseCommunitySchema)
