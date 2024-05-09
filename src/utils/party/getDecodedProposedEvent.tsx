import { partyAbi } from '@/data/contract/abis/Party'
import getProposedEventTopic from '@/utils/party/getProposedEventTopic'
import { Address, decodeEventLog } from 'viem'

const getDecodedProposedEvent = (data: Address) =>
  decodeEventLog({
    abi: partyAbi,
    data,
    topics: getProposedEventTopic(),
  })

export default getDecodedProposedEvent
