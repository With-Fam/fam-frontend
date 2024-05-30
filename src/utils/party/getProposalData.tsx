import { BytecodeProposalData, ProposalType } from '@/types/partyTypes'
import getMaxExecutableTime from '@/utils/party/getMaxExecutableTime'
import { AbiCoder } from 'ethers'
import { pad, toHex, concatHex, Address } from 'viem'

const getProposalData = (inputProposalData: BytecodeProposalData) => {
  const abiCoder = AbiCoder.defaultAbiCoder()
  const encodedBytecodeProposalData = abiCoder.encode(
    [
      'tuple(address payable target,uint256 value,bytes data,bool optional,bytes32 expectedResultHash)[]',
    ],
    [
      [
        {
          target: inputProposalData.target,
          value: inputProposalData.value,
          data: '0x',
          optional: false,
          expectedResultHash:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
        },
      ],
    ]
  )

  console.log('SWEETS encodedBytecodeProposalData', encodedBytecodeProposalData)

  // Convert ProposalType.ArbitraryCalls to hex and pad it to 4 bytes
  const hexEncodedSelector = pad(toHex(ProposalType.ArbitraryCalls), {
    size: 4,
  })

  // Concatenate the selector and the encoded proposal data
  const proposalData = concatHex([
    hexEncodedSelector,
    encodedBytecodeProposalData as Address,
  ])

  // Construct the proposal struct
  const proposalStruct: any = {
    cancelDelay: '0',
    maxExecutableTime: getMaxExecutableTime(),
    proposalData,
  }

  return proposalStruct
}

export default getProposalData
