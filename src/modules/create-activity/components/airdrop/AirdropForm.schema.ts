import * as Yup from 'yup'

import type { AddressType } from '@/types'
import { addressValidationSchema } from '@/utils/yup'

export interface AirdropFormValues {
  recipientAddress: AddressType | ''
  // amount?: number
}

const airdropFormSchema = Yup.object({
  recipientAddress: addressValidationSchema,
  // amount: yup.number().min(1, 'Must be at least 1 token').required(),
})

export default airdropFormSchema
