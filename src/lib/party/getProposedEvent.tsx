import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import getProposalDecodeBytecode from '@/lib/party/getProposalDecodeBytecode'
import { getPublicClient } from '@/lib/viem'

const getProposedEvent = async (party: any, proposalBlocknumber: any) => {
  const publicClient = getPublicClient(CHAIN_ID)

  const logs = await publicClient.getContractEvents({
    address: party,
    abi: partyAbi,
    eventName: 'Proposed',
    fromBlock: BigInt(proposalBlocknumber),
    toBlock: BigInt(proposalBlocknumber),
  })

  const event = logs[0] as any
  const rawProposalData = event.args.proposal.proposalData

  const decodedBytecode = getProposalDecodeBytecode(rawProposalData)

  return {
    proposerAddress: event.args.proposer,
    maxExecutableTime: event.args.proposal.maxExecutableTime,
    rawProposalData,
    proposalData: [decodedBytecode],
  }
}

export default getProposedEvent
