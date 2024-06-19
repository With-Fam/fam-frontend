import {
  CROWDFUND_PARTY_FACTORY,
  INITIAL_ETH_CROWDFUND,
  METADATA_PROVIDER,
  PARTY_FACTORY,
  PARTY_IMPLEMENTATION,
} from '@/constants/addresses'
import { crowdfundFactoryAbi } from '@/data/contract/abis/CrowdfundFactory'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { useFormStore } from '@/modules/create-community'
import { getPublicClient } from '@/utils/viem'
import getViemNetwork from '@/utils/viem/getViemNetwork'
import { CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { isAddress, toBytes, zeroAddress } from 'viem'
import getEnsAddress from '@/utils/getEnsAddress'
import { ethers } from 'ethers'
import getEncodedPartyMetadata from '@/utils/party/getEncodedPartyMetadata'

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
        partyFactory: PARTY_FACTORY[chainId],
        partyImpl: PARTY_IMPLEMENTATION[chainId],
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

      const metadata = {
        name: general.daoName,
        description: toBytes(general.projectDescription as string),
        externalURL: toBytes(general.daoWebsite as string),
        image: toBytes(general.daoAvatar as string),
        banner: toBytes(general.daoAvatar as string),
        animationURL: toBytes(general.daoAvatar as string),
        collectionName: general.daoName,
        collectionDescription: toBytes(general.projectDescription as string),
        collectionExternalURL: toBytes(general.daoWebsite as string),
        royaltyReceiver: address,
        royaltyAmount: 0,
        renderingMethod: 0,
      }

      const encodedMetadata = getEncodedPartyMetadata(metadata)

      const contractConfig = {
        address: CROWDFUND_PARTY_FACTORY[chainId],
        chain: getViemNetwork(chainId),
        abi: crowdfundFactoryAbi,
        functionName: 'createInitialETHCrowdfundWithMetadata',
        args: [
          INITIAL_ETH_CROWDFUND[chainId],
          crowdfundOpts,
          partyOpts,
          METADATA_PROVIDER[chainId],
          encodedMetadata,
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
