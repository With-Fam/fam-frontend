import { Address, WalletClient, multicall3Abi } from 'viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { MULTICALL } from '@/constants/addresses'

export interface MulticallParams {
  target: Address
  allowFailure: boolean
  callData: `0x${string}`
}

export const executeMulticall = async ({
  calls,
  walletClient,
}: {
  calls: MulticallParams[]
  walletClient: WalletClient
}): Promise<`0x${string}`> => {
  if (!walletClient.account) {
    throw new Error('Wallet client account is required')
  }

  return walletClient.writeContract({
    address: MULTICALL,
    abi: multicall3Abi,
    functionName: 'aggregate3',
    args: [calls],
    chain: CHAIN,
    account: walletClient.account,
  })
}
