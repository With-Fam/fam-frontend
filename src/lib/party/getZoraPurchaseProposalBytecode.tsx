import { encodeFunctionData } from 'viem'
import getProposalBytecode from '@/lib/party/getProposalBytecode'
import FAM from '@/constants/fam'

const getZoraPurchaseProposalBytecode = async (
  collectionAddress: any,
  collectionName: any,
  parameters: any
) => {
  const { abi, functionName, args, value } = parameters
  args[5] = `Collected by ${collectionName} on Fam`
  args[4] = FAM

  console.log('ZIAD', args, value)

  const data = encodeFunctionData({
    abi,
    functionName,
    args,
  })

  const encodedBytecodeProposalData = getProposalBytecode(
    collectionAddress,
    value,
    data
  )
  return encodedBytecodeProposalData
}

export default getZoraPurchaseProposalBytecode
