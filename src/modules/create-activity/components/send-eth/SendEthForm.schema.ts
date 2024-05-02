import * as yup from 'yup'

import type { AddressType } from '@/types'
import { addressValidationSchema } from '@/utils/yup'

export interface SendEthValues {
  recipientAddress?: string | AddressType
  amount?: number
}
