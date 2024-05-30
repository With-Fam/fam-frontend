import { FounderFormValues } from '@/modules/create-community/components/auctions/AuctionForm.schema'
import * as Yup from 'yup'

export interface MembershipFormValues extends FounderFormValues {
  membershipPrice: number
  mintPeriod: number
  revenueSplit: number
}

export const membershipValidationSchema = Yup.object({
  membershipPrice: Yup.number().required(),
  mintPeriod: Yup.number().optional(),
  revenueSplit: Yup.number().optional(),
})
