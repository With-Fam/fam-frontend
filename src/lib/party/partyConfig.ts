import { Address } from 'viem'
import { CHAIN_ID } from '@/constants/defaultChains'
import { GOVERNANCE_OPT_FEE_RECIPIENT } from '@/constants/addresses'

export interface PartyGovernanceOpts {
  hosts: readonly Address[]
  voteDuration: number
  executionDelay: number
  passThresholdBps: number
  totalVotingPower: bigint
  feeBps: number
  feeRecipient: Address
}

export interface PartyProposalEngineOpts {
  enableAddAuthorityProposal: boolean
  allowArbCallsToSpendPartyEth: boolean
  allowOperators: boolean
  distributionsConfig: number
}

export interface PartyOpts {
  governance: PartyGovernanceOpts
  proposalEngine: PartyProposalEngineOpts
  name: string
  symbol: string
  customizationPresetId: bigint
}

export const getPartyGovernanceOpts = (
  hosts: readonly Address[],
  threshold: number,
  vetoPeriod: number,
  totalVotingPower: bigint
): PartyGovernanceOpts => {
  const BPS_MULTIPLIER = 100
  const passThreshold = ((threshold / 100) * Number(totalVotingPower)) / 1e18
  const passThresholdBps = passThreshold * BPS_MULTIPLIER

  return {
    hosts,
    voteDuration: vetoPeriod,
    executionDelay: vetoPeriod,
    passThresholdBps,
    totalVotingPower,
    feeBps: 250,
    feeRecipient: GOVERNANCE_OPT_FEE_RECIPIENT[CHAIN_ID],
  }
}

export const getPartyProposalEngineOpts = (): PartyProposalEngineOpts => ({
  enableAddAuthorityProposal: true,
  allowArbCallsToSpendPartyEth: true,
  allowOperators: true,
  distributionsConfig: 1,
})

export const getPartyOpts = (
  governanceOpts: PartyGovernanceOpts
): PartyOpts => ({
  governance: governanceOpts,
  proposalEngine: getPartyProposalEngineOpts(),
  name: 'PARTY',
  symbol: 'FAM',
  customizationPresetId: 0n,
})
