import { TransactionType } from '@/modules/create-activity/types'

const getProposalType = async (proposal: any) => {
  try {
    const proposalData: any = proposal.proposalData[0]
    const proposalHexdata = proposalData?.data

    if (proposalHexdata === '0x') return TransactionType.SEND_ETH
    if (proposalHexdata.length === 650 || proposalHexdata.length === 714)
      return TransactionType.ZORA_COLLECT
    if (proposalHexdata.length === 3338) return TransactionType.ZORA_CREATE

    return null
  } catch (error) {
    return null
  }
}

export default getProposalType
