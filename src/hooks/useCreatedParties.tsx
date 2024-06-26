import { CROWDFUND_PARTY_FACTORY } from '@/constants/addresses'
import { crowdfundFactoryAbi } from '@/data/contract/abis/CrowdfundFactory'
import { getPublicClient } from '@/lib/viem'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

type ChainId = 8453 | 84532

const useCreatedParites = (chainId: number, address: Address) => {
  const [parties, setParties] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const publicClient = getPublicClient(chainId)

      const logs = await publicClient.getContractEvents({
        address: CROWDFUND_PARTY_FACTORY[`${chainId as ChainId}`],
        abi: crowdfundFactoryAbi,
        eventName: 'InitialETHCrowdfundCreated',
        args: {
          creator: address,
        },
        fromBlock: 0n,
        toBlock: 'latest',
      })

      const formattedLogs = logs.map((log: any) => log.args.party)
      setParties(formattedLogs)
      setLoading(false)
    }
    if (!chainId || !address) return
    init()
  }, [chainId, address])

  return {
    parties,
    loading,
  }
}

export default useCreatedParites
