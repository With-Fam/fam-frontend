import { AddressType, BytesType, CHAIN_ID } from '@/types'
import { governorAbi } from '../abis'
export enum ProposalState {
  Pending = 0,
  Active = 1,
  Canceled = 2,
  Defeated = 3,
  Succeeded = 4,
  Queued = 5,
  Expired = 6,
  Executed = 7,
  Vetoed = 8,
}

export const getProposalState = async (
  chainId: CHAIN_ID,
  governorAddress: AddressType,
  proposalId: BytesType
) => {
  return 0
}
