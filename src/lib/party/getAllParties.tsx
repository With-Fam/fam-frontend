import { CROWDFUND_PARTY_FACTORY } from '@/constants/addresses'
import { ethGetLogs } from '@/lib/alchemy/eth_getLogs'
import { Address } from 'viem'

type ChainId = 8453 | 84532

const getAllParties = async (chainId: ChainId) => {
  const topics = [
    '0x363055a8c80944931bc4016a9be0a4fde108ec2b5a64b3a71cdc2a77e0f3acf5',
  ]
  const response = await ethGetLogs(
    chainId,
    CROWDFUND_PARTY_FACTORY[chainId] as Address,
    topics
  )
  const results: Address[] = response?.map(
    (log: any) => `0x${log.topics[3].slice(26)}`
  )

  return results
}

export default getAllParties
