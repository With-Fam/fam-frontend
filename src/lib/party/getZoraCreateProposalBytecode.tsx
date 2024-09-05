import { encodeFunctionData } from 'viem'
import getProposalBytecode from './getProposalBytecode'

const getZoraCreateProposalBytecode = (parameters: any) => {
  const { abi, args, value, address: minterAddress } = parameters
  const data = encodeFunctionData({
    abi,
    functionName: 'createContract',
    args,
  })

  const encodedBytecodeProposalData = getProposalBytecode(
    minterAddress,
    value || 0n,
    data
  )
  return encodedBytecodeProposalData
}

export default getZoraCreateProposalBytecode
