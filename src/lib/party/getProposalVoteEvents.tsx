import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import { getPublicClient } from '@/lib/viem'

const getProposalVoteEvent = async (
  party: any,
  proposalId: any,
  proposalBlocknumber: any
) => {
  const publicClient = getPublicClient(CHAIN_ID)

  const logs: any = await publicClient.getContractEvents({
    address: party,
    abi: partyAbi,
    eventName: 'ProposalAccepted',
    fromBlock: BigInt(proposalBlocknumber),
    toBlock: 'latest',
  })

  const events = logs.map((log: any) => ({
    address: log.args.voter,
    blockNumber: log.blockNumber.toString(),
    txnHash: log.transactionHash,
    weight: log.args.weight.toString(),
    proposalId: log.args.proposalId.toString(),
  }))

  const filteredEvents = events.filter(
    (evt: any) => evt.proposalId === proposalId
  )

  return filteredEvents
}

export default getProposalVoteEvent
