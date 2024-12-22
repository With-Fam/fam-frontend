import { hypersubFactoryAbi } from '@/lib/abi/hypersubFactoryAbi'
import { hypersubAbi } from '@/lib/abi/hypersubAbi'
import { Address, createPublicClient, http, parseEventLogs } from 'viem'
import { baseSepolia } from 'viem/chains'
import { getPublicClient } from '@/lib/viem'
import { CHAIN_ID } from '@/constants/defaultChains'
import { HYPERSUB_FACTORY } from '@/constants/addresses'

interface Hypersub {
  id: string
  title: string
  imageUrl: string
}

const options = {
  method: 'GET',
  headers: { 'X-Dune-Api-Key': process.env.DUNE_API_KEY as string },
}

const getHypersubByOwner = async (owner: Address): Promise<Hypersub[]> => {
  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/${owner}?chain_ids=${CHAIN_ID}&to=${HYPERSUB_FACTORY[CHAIN_ID]}`,
    options
  )
  const data = await response.json()

  const hypersubAddresses = data.transactions.reduce(
    (addresses: Address[], tx: any) => {
      if (!tx.logs) return addresses

      const logs = parseEventLogs({
        abi: hypersubFactoryAbi,
        logs: tx.logs,
        eventName: 'Deployment',
      })

      if (logs.length > 0) {
        const address = logs[0].args.deployment as Address
        if (address) {
          addresses.push(address)
        }
      }

      return addresses
    },
    []
  )

  const publicClient = getPublicClient(CHAIN_ID)

  const contracts = hypersubAddresses.flatMap((address: Address) => [
    {
      address,
      abi: hypersubAbi,
      functionName: 'name',
    },
    {
      address,
      abi: hypersubAbi,
      functionName: 'contractURI',
    },
  ])

  const results = await publicClient.multicall({
    contracts,
  })

  const hypersubs: Hypersub[] = []
  for (let i = 0; i < hypersubAddresses.length; i++) {
    const nameResult = results[i * 2]
    const uriResult = results[i * 2 + 1]

    console.log('Processing hypersub:', {
      address: hypersubAddresses[i],
      nameResult,
      uriResult,
    })

    const address = hypersubAddresses[i]
    const name =
      nameResult.status === 'success' ? nameResult.result : `Hypersub ${i + 1}`

    const imageUrl = '/assets/images/fam-default-card.jpg'

    hypersubs.push({
      id: address,
      title: name as string,
      imageUrl,
    })
  }

  console.log('Final hypersubs:', hypersubs)
  return hypersubs
}

export default getHypersubByOwner
