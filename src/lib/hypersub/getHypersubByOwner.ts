import { hypersubFactoryAbi } from '@/lib/abi/hypersubFactoryAbi'
import { hypersubAbi } from '@/lib/abi/hypersubAbi'
import { Address, createPublicClient, http, parseEventLogs } from 'viem'
import { baseSepolia } from 'viem/chains'

interface Hypersub {
  id: string
  title: string
  imageUrl: string
}

const options = {
  method: 'GET',
  headers: { 'X-Dune-Api-Key': process.env.DUNE_API_KEY as string },
}

const getHypersubByOwner = async (owner: string): Promise<Hypersub[]> => {
  // 1. Get all hypersub addresses from Dune
  const response = await fetch(
    'https://api.dune.com/api/echo/v1/transactions/evm/0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38?chain_ids=84532&to=0x3E4996Dc97B05C7e5379A2f6F4B844643BB1D9F2',
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

  console.log('Found hypersub addresses:', hypersubAddresses)

  // 2. Set up public client for multicall
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  })

  // 3. Prepare multicall contracts
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

  // 4. Execute multicall
  const results = await publicClient.multicall({
    contracts,
  })

  // 5. Process results
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
