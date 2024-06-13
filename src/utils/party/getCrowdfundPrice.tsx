import { CHAIN_ID } from '@/constants/defaultChains'
import { crowdfundFactoryAbi } from '@/data/contract/abis/CrowdfundFactory'
import { getPublicClient } from '@/utils/viem'
import { Address } from 'viem'

const getCrowdfundPrice = async (crowdfundAddress: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)

  const price = await publicClient.readContract({
    abi: crowdfundFactoryAbi,
    functionName: 'minContribution',
    address: crowdfundAddress,
  })

  return price
}

export default getCrowdfundPrice
