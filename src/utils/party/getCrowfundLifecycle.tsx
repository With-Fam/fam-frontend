import { CHAIN_ID } from '@/constants/defaultChains'
import { initialETHCrowdfundAbi } from '@/data/contract/abis/InitialETHCrowdfund'
import { getPublicClient } from '@/utils/viem'
import { Address } from 'viem'

const getCrowfundLifecycle = async (crowdfund: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)
  const data = await publicClient.readContract({
    address: crowdfund,
    abi: initialETHCrowdfundAbi,
    functionName: 'getCrowdfundLifecycle',
  })
  return data
}

export default getCrowfundLifecycle
