import * as Yup from 'yup'

import { BuilderTransaction } from '../../stores/useProposalStore'

export const ERROR_CODE: Record<string, string> = {
  GENERIC: 'There was a problem submitting this proposal, please try again..',
  WRONG_NETWORK: "You're on the wrong network. Please switch and try again.",
  REJECTED: 'The transaction was rejected.',
  NOT_ENOUGH_VOTES: "You don't have enough votes to submit a proposal.",
}

export interface ReviewProposalFormValues {
  summary?: string
  title: string
  // transactions: BuilderTransaction[]
}

const schema: Yup.ObjectSchema<Omit<ReviewProposalFormValues, 'transactions'>> =
  Yup.object({
    title: Yup.string()
      .required('a title is required')
      .matches(
        /^[A-Za-z0-9 _.-]*[A-Za-z0-9][A-Za-z0-9 _.-]*$/,
        'only numbers or letters'
      )
      .max(5000, '< 256 characters'),
    summary: Yup.string().optional(),
    transactions: Yup.array().min(1, 'at least one transaction required'),
  })

export default schema
