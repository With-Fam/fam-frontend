import { CHAIN_ID } from '@/constants/defaultChains'
import { initialETHCrowdfundAbi } from '@/data/contract/abis/InitialETHCrowdfund'
import { getPublicClient } from '@/utils/viem'
import { Address } from 'viem'

const getCrowdfundPrice = async (crowdfundAddress: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)

  const price = await publicClient.readContract({
    abi: initialETHCrowdfundAbi,
    functionName: 'minContribution',
    address: crowdfundAddress,
  })

  return price
}

export default getCrowdfundPrice
