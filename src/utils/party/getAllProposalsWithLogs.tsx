import getAllProposals from '@/utils/party/getAllProposals'
import getDecodedProposedEvent from '@/utils/party/getDecodedProposedEvent'
import getFormattedProposals from '@/utils/party/getFormattedProposals'
import getProposedEvents from '@/utils/party/getProposedEvents'
import { Address } from 'viem'

const getAllProposalsWithLogs = async (community: Address) => {
  const proposals: any[] = await getAllProposals(community)
  const eventLogs = await getProposedEvents(community)
  const decodedLogs = eventLogs.map(
    (log) => getDecodedProposedEvent(log.data) as any
  )
  const updatedProposals = getFormattedProposals(proposals, decodedLogs)
  return updatedProposals
}

export default getAllProposalsWithLogs
