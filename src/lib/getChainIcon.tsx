import {
  optimism,
  optimismSepolia,
  baseSepolia,
  base,
  sepolia,
  mainnet,
  zora,
  zoraSepolia,
} from 'viem/chains'

const ethereumIcon = '/assets/chains/ethereum.svg'
const optimismIcon = 'assets/chains/optimism.svg'
const baseIcon = '/assets/chains/base.svg'
const zoraIcon = '/assets/chains/zora.png'

const getChainIcon = (chainId: number) => {
  switch (chainId) {
    case base.id:
    case baseSepolia.id:
      return baseIcon
    case optimism.id:
    case optimismSepolia.id:
      return optimismIcon
    case mainnet.id:
    case sepolia.id:
      return ethereumIcon
    case zora.id:
    case zoraSepolia.id:
      return zoraIcon
    default:
      return ethereumIcon
  }
}

export default getChainIcon
