import type { AddressType } from '@/types'

export interface SendEthValues {
  recipientAddress?: string | AddressType
  amount?: string
}
