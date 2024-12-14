import {
  ATOMIC_MANUAL_PARTY,
  GOVERNANCE_OPT_FEE_RECIPIENT,
  PARTY_IMPLEMENTATION,
  PARTY_OPT_AUTHORITIES,
} from '@/constants/addresses'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { useFormStore } from '@/modules/create-community'
import { getPublicClient } from '@/lib/viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { Address, isAddress, parseEventLogs } from 'viem'
import { atomicManualPartyAbi } from '@/lib/abi/atomicManualPartyAbi'
import getEnsAddress from '@/lib/getEnsAddress'

export interface CreatePartyResult {
  partyAddress?: Address
  error?: unknown
}

interface CreatePartyManualResult {
  createParty: () => Promise<CreatePartyResult>
}

const useCreatePartyManual = (): CreatePartyManualResult => {
  const { membership, vetoPeriod } = useFormStore()
  const { connectedWallet: address } = useConnectedWallet()
  const { walletClient } = usePrivyWalletClient()

  const createParty = async (): Promise<CreatePartyResult> => {
    if (!walletClient) return { error: 'Wallet client not found' }

    try {
      const publicClient = getPublicClient(CHAIN_ID)

      const partyMembers = [address] as Address[]
      const totalVotingPower = 100000000000000000000n
      const passThreshold =
        ((membership.threshold / 100) * Number(totalVotingPower)) / 1e18
      const BPS_MULTIPLIER = 100
      const passThresholdBps = passThreshold * BPS_MULTIPLIER

      const hostsPromise = membership.founders.map(
        async (founder: { founderAddress: string }) => {
          if (isAddress(founder.founderAddress)) return founder.founderAddress
          const ensAddress = await getEnsAddress(founder.founderAddress)
          return ensAddress as Address
        }
      )

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
        customizationPresetId: 0n,
      }

      const authorities = PARTY_OPT_AUTHORITIES[CHAIN_ID] as Address[]
      const preciousTokens = [] as Address[]
      const preciousTokenIds = [] as bigint[]
      const rageQuitTimestamp = 1715603725
      const partyMemberVotingPowers = [1000000n]

      const args = [
        PARTY_IMPLEMENTATION[CHAIN_ID],
        partyOpts,
        preciousTokens,
        preciousTokenIds,
        rageQuitTimestamp,
        partyMembers,
        partyMemberVotingPowers,
        authorities,
      ] as const

      const hash = await walletClient.writeContract({
        address: ATOMIC_MANUAL_PARTY[CHAIN_ID],
        abi: atomicManualPartyAbi,
        functionName: 'createParty',
        args,
        chain: CHAIN,
        account: address as Address,
      })

      const partyReceipt = await publicClient.waitForTransactionReceipt({
        hash,
      })

      const partyLogs = parseEventLogs({
        logs: partyReceipt.logs,
        abi: atomicManualPartyAbi,
        eventName: 'AtomicManualPartyCreated',
      })

      const partyEvent = partyLogs[0]

      return {
        partyAddress: partyEvent?.args?.party as Address | undefined,
      }
    } catch (error) {
      console.error('error', error)
      return { error }
    }
  }

  return { createParty }
}

export default useCreatePartyManual
