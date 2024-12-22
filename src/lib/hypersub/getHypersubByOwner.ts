import { hypersubFactoryAbi } from '@/lib/abi/hypersubFactoryAbi'
import { Address, parseEventLogs } from 'viem'

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

  console.log('SWEETMAN HYPERSUB ADDRESSES')
  console.log(hypersubAddresses)

  // Format the response to match the expected interface
  const formattedHypersubs = hypersubAddresses.map(
    (address: Address, index: number): Hypersub => ({
      id: address,
      title: `Hypersub ${index + 1}`,
      imageUrl: '/assets/images/fam-default-card.jpg',
    })
  )

  return formattedHypersubs
}

export default getHypersubByOwner
