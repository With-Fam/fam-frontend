import { base, baseSepolia, mainnet, optimism } from 'viem/chains'

export const mapChainIdToEndpoint = (chainId: number) => {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID
  switch (chainId) {
    case mainnet.id:
      return `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`
    case optimism.id:
      return `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`
    case base.id:
      return `https://base-mainnet.g.alchemy.com/v2/${apiKey}`
    case baseSepolia.id:
      return `https://base-sepolia.g.alchemy.com/v2/${apiKey}`
    default:
      throw new Error(`Unsupported chainId: ${chainId}`)
  }
}
