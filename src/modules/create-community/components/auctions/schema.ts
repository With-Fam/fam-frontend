import { ZodSchema, z } from 'zod'
import { nonEmptyString } from '@/utils/zod'
import { Duration } from '@/types'

export interface TokenAllocation {
  allocationPercentage: number | string
  founderAddress: string
  endDate: string
  admin?: boolean
}

export interface FounderAllocationFormValues {
  founderAllocation: TokenAllocation[]
}

export interface AuctionSettingsFormValues {
  auctionDuration: Duration
  auctionReservePrice?: number
  proposalThreshold?: number
  quorumThreshold?: number
  votingPeriod: Duration
  votingDelay: Duration
}

export type AuctionsFormValues = Pick<
  AuctionSettingsFormValues,
  'auctionReservePrice'
> &
  FounderAllocationFormValues & {
    vetoPower?: boolean
    vetoerAddress?: string
  }

const founderSchema = z.object({
  allocationPercentage: z.number({ coerce: true }),
  founderAddress: nonEmptyString,
  endDate: nonEmptyString,
  admin: z.boolean(),
})

const schema: ZodSchema<AuctionsFormValues> = z.object({
  auctionReservePrice: z.number({ coerce: true }),
  vetoPower: z.boolean().optional(),
  vetoerAddress: z.string().optional(),
  founderAllocation: z.array(founderSchema),
})

export default schema
