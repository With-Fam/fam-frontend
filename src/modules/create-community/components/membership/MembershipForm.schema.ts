import * as Yup from 'yup'

export interface TokenAllocation {
  founderAddress: string
}

export interface FounderFormValues {
  founders: TokenAllocation[]
}

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
