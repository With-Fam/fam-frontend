import {
  ATOMIC_MANUAL_PARTY,
  GOVERNANCE_OPT_FEE_RECIPIENT,
  HYPERSUB_FACTORY,
  MULTICALL,
  PARTY_IMPLEMENTATION,
  PARTY_OPT_AUTHORITIES,
  PUSH_SPLIT_FACTORY,
} from '@/constants/addresses'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { useFormStore } from '@/modules/create-community'
import { getPublicClient } from '@/lib/viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { Address, isAddress, parseEventLogs } from 'viem'
import { multicall3Abi } from '@/lib/abi/multicall3Abi'
import { getPartyCallData } from '@/lib/party/getPartyCallData'
import { getDeployHypersubCallData } from '@/lib/hypersub/getDeployHypersubCallData'
import { hypersubFactoryAbi } from '@/lib/abi/hypersubFactoryAbi'
import { atomicManualPartyAbi } from '@/lib/abi/atomicManualPartyAbi'
import { getCreateSplitCallData } from '@/lib/split/getCreateSplitCallData'
import { getEqualSplitParams } from '@/lib/split/getEqualSplitParams'
import { pushSplitFactoryAbi } from '@/lib/abi/PushSplitFactoryAbi'
import getEnsAddress from '@/lib/getEnsAddress'

export interface DeploymentResult {
  partyAddress?: Address
  hypersubAddress?: Address
  hostSplitAddress?: Address
  error?: unknown
}

interface CreatePartyManualResult {
  createPartyAndHypersub: () => Promise<DeploymentResult>
}

const useCreatePartyManual = (): CreatePartyManualResult => {
  const { membership, vetoPeriod } = useFormStore()
  const { connectedWallet: address } = useConnectedWallet()
  const { walletClient } = usePrivyWalletClient()

  const createPartyAndHypersub = async (): Promise<DeploymentResult> => {
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

      // Then create the host split
      const hostSplitParams = getEqualSplitParams(
        membership.founders.map((f) => f.founderAddress as Address)
      )
      const hostSplitCallData = getCreateSplitCallData({
        splitParams: hostSplitParams,
        owner: address as Address,
        creator: address as Address,
      })

      // Finally deploy the hypersub
      const hypersubCallData = getDeployHypersubCallData()

      const calls = [
        {
          target: PUSH_SPLIT_FACTORY[CHAIN_ID],
          callData: hostSplitCallData,
          allowFailure: false,
        },
        {
          target: HYPERSUB_FACTORY[CHAIN_ID],
          callData: hypersubCallData,
          allowFailure: false,
        },
      ]

      console.log('calls', calls)
      const txHash = await walletClient.writeContract({
        address: MULTICALL,
        abi: multicall3Abi,
        functionName: 'aggregate3',
        args: [calls],
        chain: CHAIN,
        account: address as Address,
      })

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })

      const splitLogs = parseEventLogs({
        logs: receipt.logs,
        abi: pushSplitFactoryAbi,
        eventName: 'SplitCreated',
      })

      const hypersubLogs = parseEventLogs({
        logs: receipt.logs,
        abi: hypersubFactoryAbi,
        eventName: 'Deployment',
      })

      const partyEvent = partyLogs[0]
      const splitEvent = splitLogs[0]
      const hypersubEvent = hypersubLogs[0]

      return {
        partyAddress: partyEvent?.args?.party as Address | undefined,
        hostSplitAddress: splitEvent?.args?.split as Address | undefined,
        hypersubAddress: hypersubEvent?.args?.deployment as Address | undefined,
      }
    } catch (error) {
      console.error('error', error)
      return { error }
    }
  }

  return { createPartyAndHypersub }
}

export default useCreatePartyManual
