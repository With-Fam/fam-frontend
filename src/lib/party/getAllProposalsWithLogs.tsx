import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import getDecodedProposedEvent from '@/lib/party/getDecodedProposedEvent'
import getFormattedProposals from '@/lib/party/getFormattedProposals'
import getProposedEvents from '@/lib/party/getProposedEvents'
import { getPublicClient } from '@/lib/viem'
import { Address } from 'viem'

const getAllProposalsWithLogs: any = async (community: Address) => {
  const eventLogs = await getProposedEvents(community)
  const decodedLogs = eventLogs.map(
    (log) => getDecodedProposedEvent(log.data) as any
  )
  const wagmiContract = {
    address: community,
    abi: partyAbi,
    functionName: 'getProposalStateInfo',
  } as const
  const publicClient = getPublicClient(CHAIN_ID)
  const contracts = decodedLogs.map((log) => ({
    ...wagmiContract,
    args: [log.args.proposalId],
  }))
  const results = await publicClient.multicall({
    contracts,
  })
  const updatedProposals = getFormattedProposals(decodedLogs, results)
  return updatedProposals.filter((proposal) => proposal)
}

export default getAllProposalsWithLogs
