import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClient } from '@/lib/viem'
import { Address } from 'viem'
import erc721Abi from '@/lib/abi/erc721Abi.json'

const get721Metadata = async (community: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)

  const response = await publicClient.readContract({
    address: community,
    functionName: 'contractURI',
    abi: erc721Abi,
  })

  const result = await fetch(response as string)
  const data = await result.json()

  return data
}

export default get721Metadata
