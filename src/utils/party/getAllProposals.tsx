import { CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import getLastProposalId from '@/utils/party/getLastProposalId'
import { getPublicClient } from '@/utils/viem'
import { Address } from 'viem'

const getAllProposals = async (partyAddress: Address) => {
  const lastProposalId = await getLastProposalId(partyAddress)
  const publicClient = getPublicClient(CHAIN_ID, false)
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
