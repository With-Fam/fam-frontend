import {
  Address,
  encodeAbiParameters,
  encodeFunctionData,
  parseAbiParameters,
  parseEther,
} from 'viem'
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments'
import getProposalBytecode from '@/lib/party/getProposalBytecode'
import FAM from '@/constants/fam'
import get721NFTName from '@/lib/zora/get721NFTName'

const getZoraPurchaseProposalBytecode = async (
  collectionAddress: Address,
  minter: Address,
  recipient: Address,
  price: bigint,
  tokenId: bigint = 1n
) => {
  const zoraFee = parseEther('0.000777')
  const value = price + zoraFee

  const name = await get721NFTName(recipient)

  const quantity = 1n
  const minterArguments = encodeAbiParameters(
    parseAbiParameters('address x, string y'),
    [recipient, `Collected ${name} by on Fam`]
  )

  const mintReferral = FAM

  const data = encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: 'mintWithRewards',
    args: [minter, tokenId, quantity, minterArguments, mintReferral],
  })

  const encodedBytecodeProposalData = getProposalBytecode(
    collectionAddress,
    value,
    data
  )
  return encodedBytecodeProposalData
}

export default getZoraPurchaseProposalBytecode
