import {
  CROWDFUND_PARTY_FACTORY,
  INITIAL_ETH_CROWDFUND,
} from '@/constants/addresses'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { useFormStore } from '@/modules/create-community'
import { getPublicClient } from '@/utils/viem'
import getViemNetwork from '@/utils/viem/getViemNetwork'
import { CHAIN_ID } from '@/constants/defaultChains'
import { crowdfundFactoryAbi } from '@/data/contract/abis/CrowdfundFactory'

const useCreateParty = () => {
  const chainId = CHAIN_ID
  const { auctionSettings } = useFormStore()
  const { walletClient } = usePrivyWalletClient()

  const createInitialETHCrowdfund = async () => {
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
      const governanceOpts = {
        executionDelay: 604800,
        feeBps: 250,
        feeRecipient: '0x0e63D6f414b40BaFCa676810ef1aBf05ECc8E459',
        hosts: ['0xb5acDED340D66678f01097818940A0F028DAFB8d'],
        partyFactory: '0xB418f5B001Af94A91daB2cE641E39722e1d9dDAC',
        partyImpl: '0xeFA4054F3Db3D1f5e981513a3d8A33D91FC97dc1',
        passThresholdBps: passThresholdBps,
        voteDuration: MINIMUM_VOTE_DURATION,
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

  return { createInitialETHCrowdfund }
}

export default useCreateParty
