import { Address, encodeFunctionData } from 'viem'
import { hypersubFactoryAbi } from '../abi/hypersubFactoryAbi'
import { getDeployArgs } from './getDeployArgs'

export const getDeployHypersubCallData = (fundsRecipient: Address): Address => {
  const deployArgs = getDeployArgs()
  const args = [
    deployArgs.name,
    deployArgs.symbol,
    deployArgs.contractUri,
    deployArgs.tokenUri,
    deployArgs.tokensPerSecond,
    deployArgs.minimumPurchaseSeconds,
    deployArgs.rewardBps,
    deployArgs.erc20TokenAddr,
    deployArgs.feeConfigId,
  ] as const

  return encodeFunctionData({
    abi: hypersubFactoryAbi,
    functionName: 'deploySubscription',
    args,
  })
}
