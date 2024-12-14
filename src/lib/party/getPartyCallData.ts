import { Address, encodeFunctionData, isAddress } from 'viem'
import { atomicManualPartyAbi } from '@/lib/abi/atomicManualPartyAbi'
import {
  GOVERNANCE_OPT_FEE_RECIPIENT,
  PARTY_IMPLEMENTATION,
  PARTY_OPT_AUTHORITIES,
} from '@/constants/addresses'
import { CHAIN_ID } from '@/constants/defaultChains'
import getEnsAddress from '@/lib/getEnsAddress'

export interface PartyGovernanceOpts {
  executionDelay: number
  feeBps: number
  feeRecipient: Address
  hosts: Address[]
  passThresholdBps: number
  voteDuration: number
  totalVotingPower: bigint
}

export interface PartyProposalEngineOpts {
  allowArbCallsToSpendPartyEth: boolean
  allowOperators: boolean
  distributionsConfig: number
  enableAddAuthorityProposal: boolean
}

export interface PartyOpts {
  governance: PartyGovernanceOpts
  proposalEngine: PartyProposalEngineOpts
  name: string
  symbol: string
  customizationPresetId: bigint
}

export interface GetPartyCallDataParams {
  membership: any
  vetoPeriod: number
  partyMembers: Address[]
}

export const getPartyCallData = async ({
  membership,
  vetoPeriod,
  partyMembers,
}: GetPartyCallDataParams): Promise<Address> => {
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

  return encodeFunctionData({
    abi: atomicManualPartyAbi,
    functionName: 'createParty',
    args: [
      PARTY_IMPLEMENTATION[CHAIN_ID],
      partyOpts,
      preciousTokens,
      preciousTokenIds,
      rageQuitTimestamp,
      partyMembers,
      partyMemberVotingPowers,
      authorities,
    ],
  })
}
