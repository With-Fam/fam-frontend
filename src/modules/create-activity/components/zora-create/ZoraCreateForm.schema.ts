import { Address } from 'viem'

export interface ZoraCreateValues {
  ipfsImage: string
  ipfsMedia: string
  title: string
  description: string
  pricePerEdition: number
  duration: number
  payoutAddress: Address
  customLimit: number
  customEditionSize: number
}
