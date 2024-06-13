import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/utils/viem'
import { Address, erc721Abi } from 'viem'

const balanceOf = async (contractAddress: Address, owner: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)
  const response = await publicClient.readContract({
    address: contractAddress as Address,
    functionName: 'balanceOf',
    abi: erc721Abi,
    args: [owner as Address],
  })

  return response
}

export default balanceOf
