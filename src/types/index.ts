import { AuctionFragment } from '@/data/subgraph/sdk.generated'
import { Chain as WagmiChain } from 'wagmi'
import { WriteContractUnpreparedArgs } from 'wagmi/actions'
import { managerAbi } from '@/data/contract/abis'

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
  GOERLI = 5,
  OPTIMISM = 10,
  OPTIMISM_GOERLI = 420,
  BASE = 8453,
  BASE_GOERLI = 84531,
  ZORA = 7777777,
  ZORA_GOERLI = 999,
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

export type FounderParameters = NonNullable<
  WriteContractUnpreparedArgs<typeof managerAbi, 'deploy'>
>['args'][0]

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