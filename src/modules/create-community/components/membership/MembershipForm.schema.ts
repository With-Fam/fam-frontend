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
  threshold: number
}

export const membershipValidationSchema = Yup.object({
  membershipPrice: Yup.number()
    .required('Membership price can not be empty.')
    .typeError('Membership price should be number.'),
  mintPeriod: Yup.number()
    .required('Mint period can not be empty.')
    .typeError('Mint period should be number.'),
  revenueSplit: Yup.number().optional(),
})
