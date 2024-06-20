import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import getLastProposalId from '@/lib/party/getLastProposalId'
import { getPublicClient } from '@/lib/viem'
import { Address } from 'viem'

const getAllProposals = async (partyAddress: Address) => {
  const lastProposalId = await getLastProposalId(partyAddress)
  const publicClient = getPublicClient(CHAIN_ID)
  const wagmiContract = {
    address: partyAddress,
    abi: partyAbi,
    functionName: 'getProposalStateInfo',
  } as const
  const contracts = []
  for (let i = 0; i < lastProposalId; i++) {
    contracts.push({
      ...wagmiContract,
      args: [BigInt(i + 1)],
    })
  }
  const results = await publicClient.multicall({
    contracts,
  })
  return results
}

export default getAllProposals
