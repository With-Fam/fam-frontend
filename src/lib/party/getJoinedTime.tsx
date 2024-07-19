import { CHAIN_ID } from '@/constants/defaultChains'
import { batchRpcCall } from '@/lib/alchemy/batchRpcCall'
import { mapChainIdToEndpoint } from '@/lib/alchemy/mapChainIdToEndpoint'
import { getPublicClientWithoutAlchemy } from '@/lib/viem'
import { Address, encodeEventTopics, erc721Abi } from 'viem'

const getJoinedTime = async (partyAddresses: Address[], user: Address) => {
  try {
    const publicClient = getPublicClientWithoutAlchemy(CHAIN_ID)

    const topics = encodeEventTopics({
      abi: erc721Abi,
      eventName: 'Transfer',
    })

    const batchRequests = partyAddresses.map((partyAddress) => ({
      id: 0,
      jsonrpc: '2.0',
      method: 'eth_getLogs',
      params: [
        {
          fromBlock: '0x1',
          toBlock: 'latest',
          address: partyAddress,
          topics,
        },
      ],
    }))

    const endpoint = mapChainIdToEndpoint(CHAIN_ID)

    const batchResults = await batchRpcCall(batchRequests, endpoint)

    const joinedTimePromise = batchResults.map(async (result: any) => {
      if (!result) return 0
      const joinedEvent = result.filter(
        (log: any) =>
          `0x${log.topics[2].slice(26)}`.toLowerCase() === user.toLowerCase()
      )
      const joinedEventBlock = await publicClient.getBlock({
        blockHash: joinedEvent[0].blockHash,
      })

      return parseInt(joinedEventBlock.timestamp.toString(), 10) * 1000
    })

    const joinedTimes = await Promise.all(joinedTimePromise)

    return joinedTimes
  } catch (error) {
    return null
  }
}

export default getJoinedTime
