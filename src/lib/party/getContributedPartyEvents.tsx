import { initialETHCrowdfundAbi } from '@/data/contract/abis/InitialETHCrowdfund'
import { getPublicClient } from '@/lib/viem'
import { ChainId } from '@/types/chain'
import { Address, parseAbiItem } from 'viem'

const getContributedPartyEvents = async (
  address: Address,
  chainId: ChainId
) => {
  const publicClient = getPublicClient(chainId)

  const logs: any = await publicClient.getLogs({
    event: parseAbiItem(
      'event Contributed(address indexed sender, address indexed contributor, uint256 amount, address delegate)'
    ),
    args: {
      contributor: address,
    },
    fromBlock: 0n,
    toBlock: 'latest',
  })

  const multicallCalls = logs.map((log: any) => ({
    address: log.address as Address,
    abi: initialETHCrowdfundAbi,
    functionName: 'party',
  }))
  const response = await publicClient.multicall({
    contracts: multicallCalls,
  })

  const parties = response.map((result, i) => ({
    party: result.result,
    crowdfund: logs[i].address,
    blockNumber: logs[i].blockNumber,
  }))

  return parties
}

export default getContributedPartyEvents
