import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/lib/viem'
import { Address } from 'viem'
import erc721Abi from '@/lib/abi/erc721Abi.json'

const get721NFTName = async (community: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)

  const response = await publicClient.readContract({
    address: community,
    functionName: 'name',
    abi: erc721Abi,
  })

  return response
}

export default get721NFTName
