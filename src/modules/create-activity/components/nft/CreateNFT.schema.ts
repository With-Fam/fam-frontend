import * as yup from 'yup'

import { addressValidationSchema } from '@/utils/yup'

export type EditionType = 'fixed' | 'open'

export interface CreateNFTFormValues {
  name: string
  symbol: string
  description: string
  mediaUrl: string
  mediaType?: string
  coverUrl: string
  pricePerMint: number
  maxPerAddress?: number
  maxSupply?: number
  royaltyPercentage: number
  fundsRecipient: string
  defaultAdmin: string
  publicSaleStart: string
  publicSaleEnd: string
}

const createNFTFormSchema = yup.object({
  name: yup.string().required('*'),
  symbol: yup.string().required('*'),
  description: yup.string().required('*'),
  mediaUrl: yup.string().required('*'),
  mediaType: yup.string(),
  coverUrl: yup.string(),
  pricePerMint: yup.number().required('*'),
  maxPerAddress: yup.number().integer('Must be whole number'),
  maxSupply: yup.number().optional().integer('Must be whole number'),
  royaltyPercentage: yup.number().required('*'),
  defaultAdmin: addressValidationSchema,
  fundsRecipient: addressValidationSchema,
  publicSaleStart: yup.string().required('*'),
  publicSaleEnd: yup
    .string()
    .required('*')
    .test(
      'isDateInFuture',
      'Must be in future',
      (value: string | undefined) => {
        if (!value) return false
        const date = new Date(value)
        const now = new Date()
        return date > now
      }
    ),
})

export default createNFTFormSchema
