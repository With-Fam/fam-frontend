import { CHAIN_ID } from '@/types'
import { Address } from 'wagmi'

const getProposals = (chainId: CHAIN_ID, community: Address) => {
  console.log('SWEETS LOOKUP PROPOSALS')
  console.log('SWEETS chainId', chainId)
  console.log('SWEETS community', community)
  return []
}

export default getProposals
