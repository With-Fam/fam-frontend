import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import { getPublicClient } from '@/lib/viem'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const useHosts = (members: any) => {
  const [hosts, setHosts] = useState(null)
  const { community } = useParams()

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(CHAIN_ID)

      const wagmiContract = {
        address: community as Address,
        abi: partyAbi,
        functionName: 'isHost',
      }

      const temp = [...members]

      const contracts = [] as any

      for (let i = 0; i < temp.length; i++) {
        contracts.push({
          ...wagmiContract,
          args: [temp[i].userAddress as Address],
        })
      }

      const results = await publicClient.multicall({
        contracts,
      })

      const hostsdata = {} as any
      for (let j = 0; j < temp.length; j++) {
        hostsdata[`${temp[j].userAddress.toLowerCase()}`] = results[j].result
      }

      setHosts(hostsdata)
    }
    if (!members || !members?.length || !community) return
    init()
  }, [members])

  return {
    hosts,
  }
}

export default useHosts
