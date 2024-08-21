import { encodeFunctionData } from 'viem'
import getProposalBytecode from '@/lib/party/getProposalBytecode'
import FAM from '@/constants/fam'

const getZoraPurchaseProposalBytecode = async (
  collectionName: any,
  parameters: any
) => {
  const { abi, functionName, args, value, address: minterAddress } = parameters
  args[5] = `Collected by ${collectionName} on Fam`
  args[4] = FAM

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
