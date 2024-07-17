import { foundry } from 'viem/chains'

import { CHAIN_ID } from '@/types'

export const RPC_URL = {
  [CHAIN_ID.ETHEREUM]: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
  [CHAIN_ID.OPTIMISM]: `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
  [CHAIN_ID.SEPOLIA]: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
  [CHAIN_ID.OPTIMISM_SEPOLIA]: `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
  [CHAIN_ID.BASE]: `https://mainnet.base.org`,
  [CHAIN_ID.BASE_SEPOLIA]: 'https://sepolia.base.org',
  [CHAIN_ID.ZORA]: 'https://rpc.zora.energy',
  [CHAIN_ID.ZORA_SEPOLIA]: 'https://sepolia.rpc.zora.energy',
  [CHAIN_ID.FOUNDRY]: foundry.rpcUrls.default.http[0],
}
