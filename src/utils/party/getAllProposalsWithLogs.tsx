import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import getDecodedProposedEvent from '@/utils/party/getDecodedProposedEvent'
import getFormattedProposals from '@/utils/party/getFormattedProposals'
import getProposedEvents from '@/utils/party/getProposedEvents'
import { getPublicClient } from '@/utils/viem'
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
