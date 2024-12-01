import { zeroAddress, Address } from 'viem'

export interface HypersubDeployArgs {
  name: string
  symbol: string
  contractUri: string
  tokenUri: string
  tokensPerSecond: bigint
  minimumPurchaseSeconds: bigint
  rewardBps: number
  erc20TokenAddr: Address
  feeConfigId: bigint
}

export function getDeployArgs(): HypersubDeployArgs {
  return {
    name: 'FAM SUBSCRIPTION',
    symbol: 'FAM',
    contractUri: 'ipfs://',
    tokenUri: 'ipfs://',
    tokensPerSecond: BigInt(1),
    minimumPurchaseSeconds: BigInt(1),
    rewardBps: 500,
    erc20TokenAddr: zeroAddress,
    feeConfigId: BigInt(0),
  }
}

export function getDeployArgsArray(args: HypersubDeployArgs) {
  return [
    args.name,
    args.symbol,
    args.contractUri,
    args.tokenUri,
    args.tokensPerSecond,
    args.minimumPurchaseSeconds,
    args.rewardBps,
    args.erc20TokenAddr,
    args.feeConfigId,
  ] as const
}
