import {
  ATOMIC_MANUAL_PARTY,
  CROWDFUND_PARTY_FACTORY,
  INITIAL_ETH_CROWDFUND,
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
import { crowdfundFactoryAbi } from '@/data/contract/abis/CrowdfundFactory'
import { zeroAddress } from 'viem'

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

  const createInitialETHCrowdfund = async () => {
    console.log('SWEETS createInitialETHCrowdfund')
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
      const publicClient = getPublicClient(chainId)
      const crowdfundOpts = {
        disableContributingForExistingCard: true,
        duration: 86400,
        exchangeRate: 1000000000000000000n,
        fundingSplitBps: 0,
        fundingSplitRecipient: '0xb5acDED340D66678f01097818940A0F028DAFB8d',
        gateKeeper: '0x0000000000000000000000000000000000000000',
        gateKeeperId: '0x000000000000000000000000',
        initialContributor: '0x0000000000000000000000000000000000000000',
        initialDelegate: '0x0000000000000000000000000000000000000000',
        maxContribution: 1000000000000000n,
        maxTotalContributions: 1000000000000000000000000n,
        minContribution: 1000000000000000n,
        minTotalContributions: 1000000000000000n,
      }
      console.log('SWEETS crowdfundOpts', crowdfundOpts)

      const governanceOpts = {
        executionDelay: 604800,
        feeBps: 250,
        feeRecipient: '0x0e63D6f414b40BaFCa676810ef1aBf05ECc8E459',
        hosts: ['0xb5acDED340D66678f01097818940A0F028DAFB8d'],
        partyFactory: '0xB418f5B001Af94A91daB2cE641E39722e1d9dDAC',
        partyImpl: '0xeFA4054F3Db3D1f5e981513a3d8A33D91FC97dc1',
        passThresholdBps: 3000,
        voteDuration: 604800,
      }
      const proposalEngineOpts = {
        allowArbCallsToSpendPartyEth: true,
        allowOperators: true,
        distributionsConfig: 1,
        enableAddAuthorityProposal: true,
      }
      const partyOpts = {
        authorities: [
          '0xD73a81cD18928b98A22008f1e28c81bb97202deE',
          '0x8723B021b008dD370FBEc1C791C390A2BC957654',
        ],
        customizationPresetId: 2n,
        governanceOpts,
        name: 'testing',
        preciousTokens: [],
        preciousTokenIds: [],
        proposalEngineOpts,
        rageQuitTimestamp: 0,
        symbol: 'testing',
      }

      const createGateCallData = '0x0000000000000000000000000000000000000000'
      const contractConfig = {
        address: CROWDFUND_PARTY_FACTORY[chainId],
        chain: getViemNetwork(chainId),
        abi: crowdfundFactoryAbi,
        functionName: 'createInitialETHCrowdfund',
        args: [
          INITIAL_ETH_CROWDFUND[chainId],
          crowdfundOpts,
          partyOpts,
          createGateCallData,
        ],
      } as any
      console.log('SWEETS contractConfig', contractConfig)

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
      console.log('SWEETS createInitialETHCrowdfund errror', error)
      return { error }
    }
  }

  return { createParty, createInitialETHCrowdfund }
}

export default useCreateParty
