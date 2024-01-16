import * as yup from 'yup'

import { addressValidationSchema } from '@/utils/yup'

export type EditionType = 'fixed' | 'open'

export interface CreateNFTFormValues {
  name: string
  symbol: string
  description: string
  duration: number
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
}

const createNFTFormSchema = yup.object({
  name: yup.string().required('*'),
  symbol: yup.string().required('*'),
  description: yup.string().required('*'),
  mediaUrl: yup.string().required('*'),
  mediaType: yup.string(),
  coverUrl: yup.string().optional(),
  pricePerMint: yup.number().required('*'),
  maxPerAddress: yup.number().integer('Must be whole number'),
  maxSupply: yup.number().optional().integer('Must be whole number'),
  royaltyPercentage: yup.number().required('*'),
  defaultAdmin: addressValidationSchema,
  fundsRecipient: addressValidationSchema,
  publicSaleStart: yup.string().required('*'),
  duration: yup.number().required().min(1).max(31),
})

export default createNFTFormSchema
