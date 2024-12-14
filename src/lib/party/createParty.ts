import { Address, WalletClient, parseEventLogs, isAddress } from 'viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import {
  ATOMIC_MANUAL_PARTY,
  PARTY_IMPLEMENTATION,
  PARTY_OPT_AUTHORITIES,
} from '@/constants/addresses'
import { atomicManualPartyAbi } from '@/lib/abi/atomicManualPartyAbi'
import { getPublicClient } from '@/lib/viem'
import getEnsAddress from '@/lib/getEnsAddress'
import { getPartyGovernanceOpts, getPartyOpts } from './partyConfig'

export interface CreatePartyParams {
  founders: { founderAddress: string }[]
  threshold: number
  vetoPeriod: number
  ownerAddress: Address
  walletClient: WalletClient
}

export interface CreatePartyResult {
  partyAddress?: Address
  error?: unknown
}

const resolveFounderAddresses = async (
  founders: { founderAddress: string }[]
): Promise<readonly Address[]> => {
  const hostsPromise = founders.map(async (founder) => {
    if (isAddress(founder.founderAddress)) return founder.founderAddress
    const ensAddress = await getEnsAddress(founder.founderAddress)
    return ensAddress as Address
  })
  return Promise.all(hostsPromise)
}

export const createParty = async ({
  founders,
  threshold,
  vetoPeriod,
  ownerAddress,
  walletClient,
}: CreatePartyParams): Promise<CreatePartyResult> => {
  try {
    const publicClient = getPublicClient(CHAIN_ID)
    const partyMembers = [ownerAddress] as Address[]
    const totalVotingPower = 100000000000000000000n
    const hosts = await resolveFounderAddresses(founders)

    const governanceOpts = getPartyGovernanceOpts(
      hosts,
      threshold,
      vetoPeriod,
      totalVotingPower
    )
    const partyOpts = getPartyOpts(governanceOpts)

    const args = [
      PARTY_IMPLEMENTATION[CHAIN_ID],
      partyOpts as any,
      [] as readonly Address[],
      [] as readonly bigint[],
      1715603725 as const,
      partyMembers as readonly Address[],
      [1000000n] as readonly [bigint],
      PARTY_OPT_AUTHORITIES[CHAIN_ID] as readonly Address[],
    ] as const

    const hash = await walletClient.writeContract({
      address: ATOMIC_MANUAL_PARTY[CHAIN_ID],
      abi: atomicManualPartyAbi,
      functionName: 'createParty',
      args,
      chain: CHAIN,
      account: ownerAddress,
    })

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    const partyLogs = parseEventLogs({
      logs: receipt.logs,
      abi: atomicManualPartyAbi,
      eventName: 'AtomicManualPartyCreated',
    })

    return { partyAddress: partyLogs[0]?.args?.party as Address | undefined }
  } catch (error) {
    console.error('error', error)
    return { error }
  }
}
