import {
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
import { isAddress, zeroAddress } from 'viem'
import getEnsAddress from '@/utils/getEnsAddress'
import { ethers } from 'ethers'

const useCreateParty = () => {
  const chainId = CHAIN_ID
  const { general, membership, votePeriod } = useFormStore()
  const { connectedWallet: address } = useConnectedWallet()
  const { walletClient } = usePrivyWalletClient()

  const createInitialETHCrowdfund = async () => {
    if (!walletClient) return { error: 'Wallet client not found' }
    const totalVotingPower = 100000000000000000000n
    const passThreshold =
      ((membership.threshold / 100) * Number(totalVotingPower)) / 1e18
    const BPS_MULTIPLIER = 100
    const passThresholdBps = passThreshold * BPS_MULTIPLIER
    const price = ethers.parseEther(membership.membershipPrice.toString())
    try {
      const ONE_HOUR = 60 * 60
      const MINIMUM_VOTE_DURATION = ONE_HOUR
      const publicClient = getPublicClient(chainId)
      const crowdfundOpts = {
        disableContributingForExistingCard: true,
        duration: 86400 * membership.mintPeriod,
        exchangeRate: 1000000000000000000n,
        fundingSplitBps: membership.revenueSplit * 100,
        fundingSplitRecipient: address,
        gateKeeper: zeroAddress,
        gateKeeperId: '0x000000000000000000000000',
        initialContributor: zeroAddress,
        initialDelegate: zeroAddress,
        maxContribution: price,
        maxTotalContributions: 1000000000000000000000000n,
        minContribution: price,
        minTotalContributions: price,
      }
      const hostsPromise = membership.founders.map(async (founder) => {
        if (isAddress(founder.founderAddress)) return founder.founderAddress
        const ensAddress = await getEnsAddress(founder.founderAddress)
        return ensAddress
      })

      const hosts = await Promise.all(hostsPromise)

      const governanceOpts = {
        executionDelay: 604800,
        feeBps: membership.revenueSplit * 100,
        feeRecipient: '0x0e63D6f414b40BaFCa676810ef1aBf05ECc8E459',
        hosts,
        partyFactory: '0xB418f5B001Af94A91daB2cE641E39722e1d9dDAC',
        partyImpl: '0xeFA4054F3Db3D1f5e981513a3d8A33D91FC97dc1',
        passThresholdBps: passThresholdBps,
        voteDuration: votePeriod,
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
        name: general.daoName,
        preciousTokens: [],
        preciousTokenIds: [],
        proposalEngineOpts,
        rageQuitTimestamp: 0,
        symbol: general.daoSymbol,
      }
      const createGateCallData = zeroAddress
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
