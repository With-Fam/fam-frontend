import { PUBLIC_MANAGER_ADDRESS } from '@/constants/addresses'
import SWR_KEYS from '@/constants/swrKeys'
import { auctionAbi, managerAbi } from '@/data/contract/abis'
import { ProposalState } from '@/data/contract/requests/getProposalState'
import { Proposal } from '@/data/subgraph/requests/proposalQuery'
import { getProposals } from '@/data/subgraph/requests/proposalsQuery'
import { CONTRACT_VERSION_DETAILS, VersionType } from '@/modules/create-activity/constants/versions'
import { BuilderTransaction, Transaction } from '@/modules/create-activity/stores'
import { TransactionType } from '@/modules/create-activity/types'
import { DaoContractAddresses } from '@/modules/dao'
import { CHAIN_ID } from '@/types'
import intersection from 'lodash/intersection'
import isNil from 'lodash/isNil'
import isUndefined from 'lodash/isUndefined'
import lt from 'lodash/lt'
import pickBy from 'lodash/pickBy'
import useSWR from 'swr'
import { encodeFunctionData } from 'viem'
import { useContractReads } from 'wagmi'



interface AvailableUpgrade {
  shouldUpgrade: boolean
  transaction?: BuilderTransaction
  currentVersions?: DaoVersions
  latest?: string
  date?: string
  description?: string
  activeUpgradeProposalId?: string
  totalContractUpgrades?: number
}

interface AvailableUpgradeProps {
  chainId: CHAIN_ID
  addresses: DaoContractAddresses
  contractVersion?: VersionType
}

const contracts = ['governor', 'treasury', 'token', 'auction', 'metadata'] as const
type ContractType = typeof contracts[number]
type DaoVersions = Record<ContractType, string>

export const useAvailableUpgrade = ({
  chainId,
  addresses,
  contractVersion,
}: AvailableUpgradeProps): AvailableUpgrade => {
  const contract = {
    abi: managerAbi,
    address: PUBLIC_MANAGER_ADDRESS[chainId],
    chainId,
  }

  const { data: proposals } = useSWR(
    !!addresses?.token ? [SWR_KEYS.PROPOSALS_CALLDATAS, chainId, addresses?.token] : null,
    () => getProposals(chainId, addresses?.token as string, 100)
  )

  const { data, isLoading, isError } = useContractReads({
    allowFailure: false,
    enabled: !!addresses?.token,
    contracts: [
      {
        abi: auctionAbi,
        address: addresses.auction as `0x${string}`,
        chainId,
        functionName: 'paused',
      },
      {
        ...contract,
        functionName: 'contractVersion',
      },
      {
        ...contract,
        functionName: 'getLatestVersions',
      },
      {
        ...contract,
        functionName: 'getDAOVersions',
        args: [addresses?.token as `0x${string}`],
      },
      { ...contract, functionName: 'tokenImpl' },
      { ...contract, functionName: 'governorImpl' },
      { ...contract, functionName: 'treasuryImpl' },
      { ...contract, functionName: 'auctionImpl' },
      { ...contract, functionName: 'metadataImpl' },
    ] as const,
  })

  const hasUndefinedAddresses = Object.keys(pickBy(addresses, isUndefined)).length > 0
  if (!data || isLoading || hasUndefinedAddresses || isError || !proposals) {
    return {
      shouldUpgrade: false,
      transaction: undefined,
      currentVersions: undefined,
      latest: undefined,
      date: undefined,
      description: undefined,
      activeUpgradeProposalId: undefined,
      totalContractUpgrades: undefined,
    }
  }

  const [
    paused,
    managerVersion,
    latest,
    versions,
    tokenImpl,
    governorImpl,
    treasuryImpl,
    auctionImpl,
    metadataImpl,
  ] = data

  if (data.some(isNil)) {
    return {
      shouldUpgrade: false,
      latest: undefined,
      transaction: undefined,
      currentVersions: undefined,
      date: undefined,
      description: undefined,
      activeUpgradeProposalId: undefined,
      totalContractUpgrades: undefined,
    }
  }

  const daoVersions = {
    governor: versions?.governor,
    token: versions?.token,
    treasury: versions?.treasury,
    auction: versions?.auction,
    metadata: versions?.metadata,
  }

  const managerImplementationAddresses: Record<ContractType, `0x${string}`> = {
    governor: governorImpl,
    token: tokenImpl,
    treasury: treasuryImpl,
    auction: auctionImpl,
    metadata: metadataImpl,
  }

  const getUpgradesForVersion = (
    daoVersions: DaoVersions,
    givenVersion: DaoVersions
  ): Record<`0x${string}`, string> =>
    pickBy(daoVersions, (val, key) => {
      return isNil(val) || val === '' || lt(val, givenVersion[key as keyof DaoVersions])
    })

  const givenVersion: DaoVersions = contractVersion
    ? {
        token: contractVersion,
        governor: contractVersion,
        auction: contractVersion,
        metadata: contractVersion,
        treasury: contractVersion,
      }
    : latest
  const upgradesNeededForGivenVersion = getUpgradesForVersion(daoVersions, givenVersion)

  // meets the required given version, no upgrades needed
  if (Object.values(upgradesNeededForGivenVersion).length === 0) {
    return {
      latest: managerVersion,
      currentVersions: daoVersions,
      shouldUpgrade: false,
      transaction: undefined,
      date: undefined,
      description: undefined,
      activeUpgradeProposalId: undefined,
      totalContractUpgrades: undefined,
    }
  }

  const withPauseUnpause = (paused: boolean, upgrades: Transaction[]): Transaction[] => {
    if (paused) {
      return upgrades
    }

    const pause = {
      target: addresses?.auction as `0x${string}`,
      functionSignature: 'pause()',
      calldata: encodeFunctionData({
        abi: auctionAbi,
        functionName: 'pause',
      }),
      value: '',
    }

    const unpause = {
      target: addresses?.auction as `0x${string}`,
      functionSignature: 'unpause()',
      calldata: encodeFunctionData({
        abi: auctionAbi,
        functionName: 'unpause',
      }),
      value: '',
    }

    return [pause, ...upgrades, unpause]
  }

  const createUpgradeTransactions = (
    upgrades: Record<`0x${string}`, string>
  ): Transaction[] =>
    Object.keys(upgrades).map((contract) => ({
      value: '',
      target: addresses[contract as ContractType] as `0x${string}`,
      functionSignature: 'upgradeTo(address)',
      calldata: encodeFunctionData({
        abi: managerAbi,
        functionName: 'upgradeTo',
        args: [managerImplementationAddresses[contract as ContractType]],
      }),
    }))

  const findActiveUpgradeProposal = (
    proposals: Proposal[],
    upgrades: Transaction[]
  ): Proposal | undefined => {
    const activeProposals = proposals?.filter(
      (proposal) =>
        proposal.state === ProposalState.Active ||
        proposal.state === ProposalState.Pending ||
        proposal.state === ProposalState.Queued ||
        proposal.state === ProposalState.Succeeded
    )

    const upgradesCalldata = upgrades.map((upgrade) => upgrade.calldata)

    const upgradeInProgress = activeProposals.find(
      (proposal) => intersection(proposal.calldatas, upgradesCalldata).length > 0
    )

    return upgradeInProgress
  }

  const upgradesNeededForLatestVersion = getUpgradesForVersion(daoVersions, latest)

  const upgradeTransactions = createUpgradeTransactions(upgradesNeededForLatestVersion)

  const activeUpgradeProposal = findActiveUpgradeProposal(
    proposals?.proposals,
    upgradeTransactions
  )

  const noActiveUpgradeProposal = typeof activeUpgradeProposal === 'undefined'

  const upgrade = {
    type: TransactionType.UPGRADE,
    summary: `Upgrade contracts to Nouns Builder v${managerVersion}`,
    transactions: withPauseUnpause(paused, upgradeTransactions),
  }

  return {
    latest: managerVersion,
    shouldUpgrade: noActiveUpgradeProposal,
    currentVersions: daoVersions,
    date: CONTRACT_VERSION_DETAILS?.[managerVersion]['date'],
    description: `This release upgrades the DAO to v${managerVersion} to add several features, improvements and bug fixes.`,
    totalContractUpgrades: upgradeTransactions.length,
    activeUpgradeProposalId: activeUpgradeProposal?.proposalId,
    transaction: upgrade,
  }
}
