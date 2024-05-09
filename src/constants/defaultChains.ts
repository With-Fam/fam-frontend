import {
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
  zora,
  zoraSepolia,
} from 'wagmi/chains'

import { CHAIN_ID as chainIdType, Chain } from '@/types'

const MAINNET_CHAINS: Chain[] = [
  {
    ...mainnet,
    id: chainIdType.ETHEREUM,
    slug: 'ethereum',
    icon: '/chains/ethereum.svg',
  },
  { ...zora, id: chainIdType.ZORA, slug: 'zora', icon: '/chains/zora.png' },
  { ...base, id: chainIdType.BASE, slug: 'base', icon: '/chains/base.svg' },
  {
    ...optimism,
    id: chainIdType.OPTIMISM,
    slug: 'optimism',
    icon: '/chains/optimism.svg',
  },
]

const TESTNET_CHAINS: Chain[] = [
  {
    ...baseSepolia,
    id: chainIdType.BASE_SEPOLIA,
    slug: 'base-sepolia',
    icon: '/chains/base.svg',
  },
  {
    ...sepolia,
    id: chainIdType.SEPOLIA,
    slug: 'sepolia',
    icon: '/chains/ethereum.svg',
  },
  {
    ...optimismSepolia,
    id: chainIdType.OPTIMISM_SEPOLIA,
    slug: 'op-sepolia',
    icon: '/chains/optimism.svg',
  },
  {
    ...zoraSepolia,
    id: chainIdType.ZORA_SEPOLIA,
    slug: 'zora-sepolia',
    icon: '/chains/zora.png',
  },
]

export const PUBLIC_IS_TESTNET =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === 'testnet'

export const PUBLIC_ALL_CHAINS = [...MAINNET_CHAINS, ...TESTNET_CHAINS]

export const PUBLIC_DEFAULT_CHAINS = PUBLIC_IS_TESTNET
  ? TESTNET_CHAINS
  : MAINNET_CHAINS

export const CHAIN = PUBLIC_IS_TESTNET ? baseSepolia : base
export const CHAIN_ID = CHAIN.id
