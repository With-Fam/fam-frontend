import { Address } from 'viem'
import { getPublicClient } from '@/utils/viem'
import { CHAIN_ID } from '@/constants/defaultChains'
import { batchRpcCall } from '@/utils/alchemy/batchRpcCall'
import { mapChainIdToEndpoint } from '@/utils/alchemy/mapChainIdToEndpoint'
import getProposedEventTopic from '@/utils/party/getProposedEventTopic'
import { baseSepolia } from 'viem/chains'

const getProposedEvents = async (partyAddress: Address): Promise<any[]> => {
  if (!partyAddress) return []
  const topics = getProposedEventTopic()
  const publicClient = getPublicClient(baseSepolia.id)
  const latestBlockNumber = await publicClient.getBlockNumber()
  const latestBlock = Number(latestBlockNumber)
  const chunkSize = 1000000
  const batchRequests = []
  let id = 1
  const fromBlock = 0
  for (let block = fromBlock; block <= latestBlock; block += chunkSize + 1) {
    const toBlock = Math.min(block + chunkSize, latestBlock)
    batchRequests.push({
      id,
      jsonrpc: '2.0',
      method: 'eth_getLogs',
      params: [
        {
          address: partyAddress,
          fromBlock: `0x${block.toString(16)}`,
          toBlock: `0x${toBlock.toString(16)}`,
          topics,
        },
      ],
    })
    id += 1
  }
  const endpoint = mapChainIdToEndpoint(CHAIN_ID)
  const batchResults = await batchRpcCall(batchRequests, endpoint)
  const filteredResults = batchResults.filter(
    (result: any) => result !== undefined
  )
  const allLogs = filteredResults.flat()

  return allLogs
}

export default getProposedEvents
