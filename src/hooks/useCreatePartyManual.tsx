import {
  ATOMIC_MANUAL_PARTY,
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
import { PARTY_FACTORY_ABI } from '@/lib/abi/abi-PartyFactory'
import { atomicManualPartyAbi } from '@/lib/abi/atomicManualPartyAbi'

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
        totalVotingPower,
      }

      const proposalEngineOpts = {
        allowArbCallsToSpendPartyEth: true,
        allowOperators: true,
        distributionsConfig: 1,
        enableAddAuthorityProposal: true,
      }

      const partyOpts = {
        governance: governanceOpts,
        proposalEngine: proposalEngineOpts,
        name: 'PARTY',
        symbol: 'FAM',
        customizationPresetId: '0',
      }

      const partyMemberVotingPowers = [1000000n]
      const partyMembers = [address]

      const rageQuitTimestamp = 1715603725
      const args = [
        PARTY_IMPLEMENTATION[CHAIN_ID],
        partyOpts,
        [], // preciousTokens
        [], // preciousTokenIds
        rageQuitTimestamp,
        partyMembers,
        partyMemberVotingPowers,
        partyMembers,
      ]
      console.log('args', args)
      const contractConfig = {
        address: ATOMIC_MANUAL_PARTY[CHAIN_ID],
        abi: atomicManualPartyAbi,
        chain: getViemNetwork(CHAIN_ID),
        functionName: 'createParty' as const,
        args,
      }

      const txHash = await walletClient.writeContract(contractConfig)

      let transaction
      if (txHash) {
        transaction = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })
      }
      return transaction
    } catch (error) {
      console.error('error', error)
      return { error }
    }
  }

  return { createPartyManual }
}

export default useCreatePartyManual
