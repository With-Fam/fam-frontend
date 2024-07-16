import { initialETHCrowdfundAbi } from '@/data/contract/abis/InitialETHCrowdfund'
import { getPublicClient } from '@/lib/viem'
import { ChainId } from '@/types/chain'
import { Address } from 'viem'

const getContributedEvent = async (
  address: Address,
  crowdfund: Address,
  blockNumber: bigint,
  chainId: ChainId
) => {
  const publicClient = getPublicClient(chainId)

  const logs: any = await publicClient.getContractEvents({
    address: crowdfund,
    abi: initialETHCrowdfundAbi,
    eventName: 'Contributed',
    fromBlock: blockNumber,
    toBlock: 'latest',
  })

  const filteredLog = logs.filter(
    (log: any) => log.args.sender.toLowerCase() === address.toLowerCase()
  )

  if (filteredLog?.length <= 0) return null

  const contributedBlock = await publicClient.getBlock({
    blockHash: filteredLog[0].blockHash,
  })

  const timestamp = parseInt(contributedBlock.timestamp.toString(), 10) * 1000

  return {
    ...filteredLog[0],
    timestamp,
  }
}

export default getContributedEvent
