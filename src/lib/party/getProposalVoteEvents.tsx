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
    args: {
      proposalId,
    },
    fromBlock: BigInt(proposalBlocknumber),
    toBlock: 'latest',
  })

  const events = logs.map((log: any) => ({
    address: log.args.voter,
    blockNumber: log.blockNumber.toString(),
    txnHash: log.transactionHash,
    weight: log.args.weight.toString(),
  }))

  return events
}

export default getProposalVoteEvent
