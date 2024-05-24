import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import { getPublicClient } from '@/utils/viem'
import { Address } from 'viem'

const getOwners = async (partyAddress: Address): Promise<Address[]> => {
  const publicClient = getPublicClient(CHAIN_ID)
  const tokenCount = await publicClient.readContract({
    address: partyAddress,
    abi: partyAbi,
    functionName: 'tokenCount',
  })
  const wagmiContract = {
    address: partyAddress,
    abi: partyAbi,
    functionName: 'ownerOf',
  } as const
  const contracts = []
  for (let i = 1n; i <= tokenCount; i++) {
    contracts.push({
      ...wagmiContract,
      args: [i],
    })
  }
  const results = await publicClient.multicall({
    contracts,
  })
  const owners = results.map((result) => result.result) as Address[]
  return owners
}

export default getOwners
