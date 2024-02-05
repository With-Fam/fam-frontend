import { CHAIN_ID } from '@/types'
import { Chain as WagmiChain } from 'wagmi'

export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export interface Chain extends WagmiChain {
  id: CHAIN_ID
  slug: string
  icon: string
}

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`
