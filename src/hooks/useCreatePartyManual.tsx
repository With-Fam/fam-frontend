import {
  GOVERNANCE_OPT_FEE_RECIPIENT,
  METADATA_PROVIDER,
  PARTY_FACTORY,
  PARTY_IMPLEMENTATION,
  PARTY_OPT_AUTHORITIES,
} from '@/constants/addresses'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { useFormStore } from '@/modules/create-community'
import { getPublicClient } from '@/lib/viem'
import getViemNetwork from '@/lib/viem/getViemNetwork'
import { CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { isAddress, toBytes } from 'viem'
import getEnsAddress from '@/lib/getEnsAddress'
import getEncodedPartyMetadata from '@/lib/party/getEncodedPartyMetadata'

const useCreatePartyManual = () => {
  const { general, membership, vetoPeriod } = useFormStore()
  const { connectedWallet: address } = useConnectedWallet()
  const { walletClient } = usePrivyWalletClient()

  const createPartyManual = async () => {
    if (!walletClient) return { error: 'Wallet client not found' }

    const totalVotingPower = 100000000000000000000n
    const passThreshold =
      ((membership.threshold / 100) * Number(totalVotingPower)) / 1e18
    const BPS_MULTIPLIER = 100
    const passThresholdBps = passThreshold * BPS_MULTIPLIER

    try {
      const publicClient = getPublicClient(CHAIN_ID)

      const hostsPromise = membership.founders.map(async (founder) => {
        if (isAddress(founder.founderAddress)) return founder.founderAddress
        const ensAddress = await getEnsAddress(founder.founderAddress)
        return ensAddress
      })

      const hosts = await Promise.all(hostsPromise)

      const governanceOpts = {
        executionDelay: vetoPeriod,
        feeBps: 250,
        feeRecipient: GOVERNANCE_OPT_FEE_RECIPIENT[CHAIN_ID],
        hosts,
        passThresholdBps: passThresholdBps,
        voteDuration: vetoPeriod,
      }

      const proposalEngineOpts = {
        allowArbCallsToSpendPartyEth: true,
        allowOperators: true,
        distributionsConfig: 1,
        enableAddAuthorityProposal: true,
      }

      const partyOpts = {
        authorities: PARTY_OPT_AUTHORITIES[CHAIN_ID],
        customizationPresetId: 1n,
        governanceOpts,
        name: general.daoName,
        proposalEngineOpts,
        symbol: general.daoSymbol,
      }

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
        address: PARTY_FACTORY[CHAIN_ID],
        chain: getViemNetwork(CHAIN_ID),
        functionName: 'createPartyWithMetadata',
        args: [
          PARTY_IMPLEMENTATION[CHAIN_ID],
          PARTY_OPT_AUTHORITIES[CHAIN_ID],
          partyOpts,
          [], // preciousTokens
          [], // preciousTokenIds
          0, // rageQuitTimestamp
          METADATA_PROVIDER[CHAIN_ID],
          encodedMetadata,
        ],
      }

      const { request } = await publicClient.simulateContract(
        contractConfig as any
      )
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

  return { createPartyManual }
}

export default useCreatePartyManual
