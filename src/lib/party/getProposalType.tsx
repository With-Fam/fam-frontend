import {
  ZORA_FIXED_COLLECT_METHOD_ID,
  ZORA_CREATE_METHOD_ID,
  ZORA_TIMED_COLLECT_METHOD_ID,
} from '@/constants/consts'
import { TransactionType } from '@/modules/create-activity/types'

const getProposalType = (proposal: any) => {
  try {
    const proposalData: any = proposal.proposalData[0]
    const proposalHexdata = proposalData?.data

    const methodId = proposalHexdata.substring(0, 10)

    if (proposalHexdata === '0x') return TransactionType.SEND_ETH
    if (
      methodId === ZORA_FIXED_COLLECT_METHOD_ID ||
      methodId === ZORA_TIMED_COLLECT_METHOD_ID
    )
      return TransactionType.ZORA_COLLECT
    if (methodId === ZORA_CREATE_METHOD_ID) return TransactionType.ZORA_CREATE
    if ((proposalHexdata.length - 586) % 192 === 0)
      return TransactionType.ADD_MEMBER

    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export default getProposalType
