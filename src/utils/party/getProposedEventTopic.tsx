import { partyAbi } from '@/data/contract/abis/Party'
import { encodeEventTopics } from 'viem'

const getProposedEventTopic = (): any =>
  encodeEventTopics({
    abi: partyAbi,
    eventName: 'Proposed',
  })

export default getProposedEventTopic
