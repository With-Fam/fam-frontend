import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import { getPublicClient } from '@/utils/viem'
import { Address } from 'viem'

const getLastProposalId = async (partyAddress: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)
  const data = await publicClient.readContract({
    address: partyAddress,
    abi: partyAbi,
    functionName: 'lastProposalId',
  })
  return data
}

export default getLastProposalId
