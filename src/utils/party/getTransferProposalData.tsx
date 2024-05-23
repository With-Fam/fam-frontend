import { BytecodeProposalData, ProposalType } from '@/types/partyTypes'
import getMaxExecutableTime from '@/utils/party/getMaxExecutableTime'
import { encodeAbiParameters, pad, toHex, concatHex } from 'viem'

const getProposalData = (inputProposalData: BytecodeProposalData) => {
  const encodedBytecodeProposalData = encodeAbiParameters(
    [{ name: 'proposalData', type: 'BytecodeProposalData' }],
    [inputProposalData]
  )

  const hexEncodedSelector = pad(toHex(ProposalType.ArbitraryCalls), {
    size: 4,
  })

  const proposalData = concatHex([
    hexEncodedSelector,
    encodedBytecodeProposalData,
  ])

  const proposalStruct: any = {
    cancelDelay: '0',
    maxExecutableTime: getMaxExecutableTime(),
    proposalData,
  }

  return proposalStruct
}

export default getProposalData
