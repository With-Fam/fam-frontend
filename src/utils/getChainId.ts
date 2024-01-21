import { CHAIN_ID } from '@/types/chain'

export function getChainId(chainName: string): typeof CHAIN_ID[keyof typeof CHAIN_ID] {
  switch (chainName.toUpperCase()) {
    case 'ETHEREUM':
      return CHAIN_ID.ETHEREUM
    case 'GOERLI':
      return CHAIN_ID.GOERLI
    case 'OPTIMISM':
      return CHAIN_ID.OPTIMISM
    case 'OPTIMISM_GOERLI':
      return CHAIN_ID.OPTIMISM_GOERLI
    case 'BASE':
      return CHAIN_ID.BASE
    case 'BASE_GOERLI':
      return CHAIN_ID.BASE_GOERLI
    case 'ZORA':
      return CHAIN_ID.ZORA
    case 'ZORA_GOERLI':
      return CHAIN_ID.ZORA_GOERLI
    case 'FOUNDRY':
      return CHAIN_ID.FOUNDRY
    default:
      return CHAIN_ID.GOERLI // DEFAULT GOERLI
  }
}
