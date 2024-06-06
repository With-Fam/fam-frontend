import {
  CONTRIBUTION_ROUTER,
  CROWDFUND_PARTY_FACTORY,
  INITIAL_ETH_CROWDFUND,
} from '@/constants/addresses'
import { crowdfundFactoryAbi } from '@/data/contract/abis/CrowdfundFactory'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { useFormStore } from '@/modules/create-community'
import { getPublicClient } from '@/utils/viem'
import getViemNetwork from '@/utils/viem/getViemNetwork'
import { CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { zeroAddress } from 'viem'

const useJoinParty = () => {
  const chainId = CHAIN_ID
  const { auctionSettings } = useFormStore()
  const { connectedWallet: address } = useConnectedWallet()
  const { walletClient } = usePrivyWalletClient()

  const joinParty = async () => {
    if (!walletClient) return { error: 'Wallet client not found' }
    const totalVotingPower = 100000000000000000000n
    const passThreshold =
      ((auctionSettings.proposalThreshold / 100) * Number(totalVotingPower)) /
      1e18
    const BPS_MULTIPLIER = 100
    const passThresholdBps = passThreshold * BPS_MULTIPLIER

    try {
      const contractConfig = {
        address: CONTRIBUTION_ROUTER[chainId],
        chain: getViemNetwork(chainId),
        abi: crowdfundFactoryAbi,
        functionName: 'createInitialETHCrowdfund',
        args: [],
      } as any
      const { request } = await publicClient.simulateContract(contractConfig)
      const txHash = await walletClient.writeContract(request as any)

      let transaction
      if (txHash) {
        transaction = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })
      }
      return transaction
    } catch (error) {
      return { error }
    }
  }

  return { joinParty }
}

export default useJoinParty
