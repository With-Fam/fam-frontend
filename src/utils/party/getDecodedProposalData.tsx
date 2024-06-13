import { AbiCoder } from 'ethers'

const getDecodedProposalData = (data: any) => {
  const encodedData = '0x' + data.slice(10)

  const abiCoder = AbiCoder.defaultAbiCoder()
  const decodedData = abiCoder.decode(
    [
      'tuple(address payable target,uint256 value,bytes data,bool optional,bytes32 expectedResultHash)[]',
    ],
    encodedData
  )

  return decodedData[0][0]
}

export default getDecodedProposalData
