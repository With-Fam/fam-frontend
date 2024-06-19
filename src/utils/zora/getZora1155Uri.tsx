import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/utils/viem'
import { Address } from 'viem'
import zora1155Abi from '@/utils/abi/abi-ERC1155Drop.json'

const getZora1155Uri = async (contractAddress: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)
  const response = await publicClient.readContract({
    address: contractAddress as Address,
    functionName: 'contractURI',
    abi: zora1155Abi,
  })

  return response
}

export default getZora1155Uri
