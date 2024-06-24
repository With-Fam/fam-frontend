import * as yup from 'yup'

import type { AddressType } from '@/types'
import { addressValidationSchema } from '@/lib/yup'

export interface SendEthValues {
  recipientAddress?: string | AddressType
  amount?: number
}
