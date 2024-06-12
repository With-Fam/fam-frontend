import getDecodedProposedEvent from '@/utils/party/getDecodedProposedEvent'
import getFormattedProposals from '@/utils/party/getFormattedProposals'
import getProposedEvents from '@/utils/party/getProposedEvents'
import { Address } from 'viem'

const getAllProposalsWithLogs: any = async (community: Address) => {
  const eventLogs = await getProposedEvents(community)
  const decodedLogs = eventLogs.map(
    (log) => getDecodedProposedEvent(log.data) as any
  )
  const updatedProposals = getFormattedProposals(decodedLogs)
  return updatedProposals
}

export default getAllProposalsWithLogs
