import { BytecodeProposalData, ProposalType } from '@/types/partyTypes'
import getMaxExecutableTime from '@/utils/party/getMaxExecutableTime'
import { encodeAbiParameters, pad, toHex, concatHex } from 'viem'

const getProposalData = (inputProposalData: BytecodeProposalData[]) => {
  const bytecodeProposalDataAbi = [
    {
      name: 'proposalData',
      type: 'tuple[]',
      components: [
        { name: 'target', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'optional', type: 'bool' },
        { name: 'expectedResultHash', type: 'bytes32' },
      ],
    },
  ]

  const inputProposalDataFormatted = inputProposalData.map((data) => [
    data.target,
    data.value,
    data.data,
    data.optional,
    data.expectedResultHash,
  ])

  const encodedBytecodeProposalData = encodeAbiParameters(
    bytecodeProposalDataAbi,
    [inputProposalDataFormatted]
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
