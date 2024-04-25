import { AuctionFragment } from '@/data/subgraph/sdk.generated'
import { Chain as WagmiChain } from 'wagmi'

export type Maybe<T> = T | null

export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export interface TimeProps {
  seconds: number
  days: number
  hours: number
  minutes: number
}

export const enum CHAIN_ID {
  ETHEREUM = 1,
  SEPOLIA = 11155111,
  OPTIMISM = 10,
  OPTIMISM_SEPOLIA = 11155420,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
  ZORA = 7777777,
  ZORA_SEPOLIA = 999999999,
  FOUNDRY = 31337,
}

export interface Chain extends WagmiChain {
  id: CHAIN_ID
  slug: string
  icon: string
}

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`

export type DaoProps = AuctionFragment['dao']

export type CommunityDataBase = {
  id: string
  name: string
  community_id: string
  enabled: true
  featured: false
  created_at: string
  updated_at: string
  network: string
}
