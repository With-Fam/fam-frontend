import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import { getPublicClient } from '@/lib/viem'
import { Address } from 'viem'

const getPartyUris = async (partyAddresses: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)

  const contracts = [] as any
  for (let i = 0; i < partyAddresses.length; i++) {
    const wagmiContract = {
      address: partyAddresses[i],
      abi: partyAbi,
      functionName: 'contractURI',
    } as const
    contracts.push(wagmiContract)
  }
  const results = await publicClient.multicall({
    contracts,
  })
  return results
}

export default getPartyUris
