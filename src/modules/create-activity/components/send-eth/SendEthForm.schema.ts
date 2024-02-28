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
      .max(
        treasuryBalance,
        `Treasury balance is insufficient to send ETH, ${treasuryBalance} ETH available`
      )
      .min(0, 'Must send more than 0 ETH'),
  })

export default sendEthSchema
