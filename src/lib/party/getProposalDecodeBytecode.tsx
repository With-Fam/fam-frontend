import { ProposalType } from '@/types/partyTypes'
import { AbiCoder } from 'ethers'
import { pad, toHex } from 'viem'

const getProposalDecodeBytecode = (rawProposalData: any) => {
  if (rawProposalData.length === 1162) return { data: '' }
  const hexEncodedSelector = pad(toHex(ProposalType.ArbitraryCalls), {
    size: 4,
  })

  const encodedBytecodeProposalData = rawProposalData.slice(
    hexEncodedSelector.length
  )

  const abiCoder = AbiCoder.defaultAbiCoder()

  const decodedData = abiCoder.decode(
    [
      'tuple(address payable target,uint256 value,bytes data,bool optional,bytes32 expectedResultHash)[]',
    ],
    `${encodedBytecodeProposalData}`
  )

  const decodedBytecodeProposalData = decodedData[0][0]

  return {
    target: decodedBytecodeProposalData[0],
    value: decodedBytecodeProposalData[1],
    data: decodedBytecodeProposalData[2],
    optional: decodedBytecodeProposalData[3],
    expectedResultHash: decodedBytecodeProposalData[4],
  }
}

export default getProposalDecodeBytecode
