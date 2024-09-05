import { encodeFunctionData } from 'viem'
import getProposalBytecode from '@/lib/party/getProposalBytecode'

const getZoraPurchaseProposalBytecode = async (
  abi: any,
  args: any,
  functionName: any,
  value: any,
  minterAddress: any
) => {
  const data = encodeFunctionData({
    abi,
    functionName,
    args,
  })

  const encodedBytecodeProposalData = getProposalBytecode(
    minterAddress,
    value,
    data
  )
  return encodedBytecodeProposalData
}

export default getZoraPurchaseProposalBytecode
