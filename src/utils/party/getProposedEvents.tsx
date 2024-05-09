import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/utils/viem'
import { Address, parseAbiItem } from 'viem'

const getProposedEvents = async (partyAddress: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)
  console.log('SWEETS partyAddress', partyAddress)
  const event = parseAbiItem([
    'event Proposed(uint256, address, Proposal)',
    'struct Proposal { uint40;uint40; bytes; }',
  ])
  console.log('SWEETS iface', event)

  const logs = await publicClient.getLogs({
    address: partyAddress.toLowerCase() as Address,
    event,
    strict: true,
  })
  console.log('SWEETS logs', logs)
  return logs
}

export default getProposedEvents
