import getAllProposals from '@/utils/party/getAllProposals'
import getDecodedProposedEvent from '@/utils/party/getDecodedProposedEvent'
import getFormattedProposals from '@/utils/party/getFormattedProposals'
import getProposedEvents from '@/utils/party/getProposedEvents'
import { Address } from 'viem'

const getAllProposalsWithLogs: any = async (community: Address) => {
  console.log('SWEETS community', community)
  const proposals: any[] = await getAllProposals(community)
  console.log('SWEETS proposals', proposals)

  const eventLogs = await getProposedEvents(community)
  console.log('SWEETS eventLogs', eventLogs)
  const decodedLogs = eventLogs.map(
    (log) => getDecodedProposedEvent(log.data) as any
  )
  const updatedProposals = getFormattedProposals(proposals, decodedLogs)
  return updatedProposals
}

export default getAllProposalsWithLogs
