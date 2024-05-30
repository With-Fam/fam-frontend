import { CHAIN_ID } from '@/types'

export function getChainId(
  chainName: string
): (typeof CHAIN_ID)[keyof typeof CHAIN_ID] {
  switch (chainName.toUpperCase()) {
    case 'ETHEREUM':
      return CHAIN_ID.ETHEREUM
    case 'SEPOLIA':
      return CHAIN_ID.SEPOLIA
    case 'OPTIMISM':
      return CHAIN_ID.OPTIMISM
    case 'OPTIMISM_SEPOLIA':
      return CHAIN_ID.OPTIMISM_SEPOLIA
    case 'BASE':
      return CHAIN_ID.BASE
    case 'BASE_SEPOLIA':
      return CHAIN_ID.BASE_SEPOLIA
    case 'ZORA':
      return CHAIN_ID.ZORA
    case 'ZORA_SEPOLIA':
      return CHAIN_ID.ZORA_SEPOLIA
    case 'FOUNDRY':
      return CHAIN_ID.FOUNDRY
    default:
      return CHAIN_ID.BASE_SEPOLIA // DEFAULT SEPOLIA
  }
}
