import * as yup from 'yup'

import type { AddressType } from '@/types'
import { addressValidationSchema } from '@/utils/yup'

export interface SendEthValues {
  recipientAddress?: string | AddressType
  amount?: number
}

const sendEthSchema = (
  treasuryBalance: number
): yup.ObjectSchema<SendEthValues> =>
  yup.object({
    recipientAddress: addressValidationSchema,
    amount: yup
      .number()
      .required()
      .max(treasuryBalance, 'Treasury balance is insufficient to send ETH.')
      .test(
        'is-greater-than-0',
        'Must send more than 0 ETH',
        (value) => !!value && value > 0
      ),
  })

export default sendEthSchema
