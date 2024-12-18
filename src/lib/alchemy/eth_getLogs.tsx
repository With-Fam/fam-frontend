import axios from 'axios'
import getAlchemyRpcUrl from '@/lib/alchemy/getAlchemyRpcUrl'
import { Address } from 'viem'

export const ethGetLogs = async (
  chainId: number,
  contractAddress: Address,
  topics: any
) => {
  const endpoint = getAlchemyRpcUrl(chainId)

  const payload = {
    id: 0,
    jsonrpc: '2.0',
    method: 'eth_getLogs',
    params: [
      {
        fromBlock: '0x1',
        toBlock: 'latest',
        address: contractAddress,
        topics,
      },
    ],
  }

  try {
    const response = await axios.post(endpoint, payload)

    return response.data.result
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching logs:', error)
    return []
  }
}
