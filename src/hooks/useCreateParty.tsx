import {
  ATOMIC_MANUAL_PARTY,
  PARTY_IMPLEMENTATION,
} from '@/constants/addresses'
import { atomicManualPartyAbi } from '@/data/contract/abis/AtomicManualParty'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { useFormStore } from '@/modules/create-community'
import { AddressType } from '@/types'
import { getPublicClient } from '@/utils/viem'
import getViemNetwork from '@/utils/viem/getViemNetwork'
import { ZeroAddress } from 'ethers'
import { useAccount } from 'wagmi'
import { CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'

const useCreateParty = () => {
  const chainId = CHAIN_ID
  const { auctionSettings } = useFormStore()
  const { connectedWallet: address } = useConnectedWallet()
  const { walletClient } = usePrivyWalletClient()

  const createParty = async () => {
    if (!walletClient) return { error: 'Wallet client not found' }
    const totalVotingPower = 100000000000000000000n
    const passThreshold =
      ((auctionSettings.proposalThreshold / 100) * Number(totalVotingPower)) /
      1e18
    const BPS_MULTIPLIER = 100
    const passThresholdBps = passThreshold * BPS_MULTIPLIER

    try {
      const ONE_HOUR = 60 * 60
      const MINIMUM_VOTE_DURATION = ONE_HOUR
      const partyMemberVotingPowers = [1000000n]
      const partyMembers = [address as AddressType]
      const publicClient = getPublicClient(chainId)
      const contractConfig = {
        address: ATOMIC_MANUAL_PARTY[chainId],
        chain: getViemNetwork(chainId),
        abi: atomicManualPartyAbi,
        functionName: 'createParty',
        args: [
          PARTY_IMPLEMENTATION[chainId],
          {
            governance: {
              hosts: [address as AddressType],
              voteDuration: MINIMUM_VOTE_DURATION,
              executionDelay: auctionSettings.executionDelay * ONE_HOUR,
              passThresholdBps,
              totalVotingPower,
              feeBps: 0,
              feeRecipient: ZeroAddress as AddressType,
            },
            proposalEngine: {
              enableAddAuthorityProposal: true,
              allowArbCallsToSpendPartyEth: true,
              allowOperators: true,
              distributionsConfig: 1,
            },
            name: 'PARTY',
            symbol: 'FAM',
            customizationPresetId: 0n,
          },
          [],
          [],
          1715603725,
          partyMembers,
          partyMemberVotingPowers,
          partyMembers,
        ],
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

  return { createParty }
}

export default useCreateParty
