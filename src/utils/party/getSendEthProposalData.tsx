import { ProposalType } from '@/types/partyTypes'
import getMaxExecutableTime from '@/utils/party/getMaxExecutableTime'
import getProposalBytecode from '@/utils/party/getProposalBytecode'
import { pad, toHex, concatHex, Address, parseEther } from 'viem'

const getSendEthProposalData = (target: Address, value: string) => {
  const encodedBytecodeProposalData = getProposalBytecode(
    target,
    parseEther(value)
  )
  const hexEncodedSelector = pad(toHex(ProposalType.ArbitraryCalls), {
    size: 4,
  })
  const proposalData = concatHex([
    hexEncodedSelector,
    encodedBytecodeProposalData as Address,
  ])
  const proposalStruct: any = {
    cancelDelay: '0',
    maxExecutableTime: getMaxExecutableTime(),
    proposalData,
  }

  return proposalStruct
}

export default getSendEthProposalData
