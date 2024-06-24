import { CHAIN_ID } from '@/constants/defaultChains'
import { crowdfundFactoryAbi } from '@/data/contract/abis/CrowdfundFactory'
import { getPublicClient } from '@/lib/viem'
import { Address } from 'viem'

const getCrowdfundContract = async (party: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)
  const events = crowdfundFactoryAbi.filter(
    (item) => item.name === 'InitialETHCrowdfundCreated'
  )

  const logs = await publicClient.getLogs({
    event: events[0] as any,
    args: {
      party,
    },
    fromBlock: BigInt(0),
    toBlock: 'latest',
  })

  const event = logs[0] as any
  const crowdfundContract = event?.args?.crowdfund

  return crowdfundContract
}

export default getCrowdfundContract
