import { TransactionType } from '@/modules/create-activity/types'
import getZora1155Uri from '@/lib/zora/getZora1155Uri'
import { zoraCreator1155FactoryImplABI } from '@zoralabs/protocol-deployments'
import { Address, decodeFunctionData } from 'viem'
import getProposalType from '@/lib/party/getProposalType'
import zoraTimedSaleStrategyABI from '@/lib/abi/abi-zoraTimeSaleStrategy.json'

const getProposalInfo = async (proposal: any) => {
  try {
    const proposalData: any = proposal.proposalData[0]
    const proposalHexdata = proposalData?.data

    const proposalType = getProposalType(proposal)

    if (proposalType === TransactionType.SEND_ETH) {
      return {
        value: proposalData.value,
        receiver: proposalData.target,
        sender: proposal.proposerAddress,
        type: TransactionType.SEND_ETH,
        title: 'Send Funds',
      }
    }

    if (proposalType === TransactionType.ZORA_COLLECT) {
      const decodedData: any = decodeFunctionData({
        abi: zoraTimedSaleStrategyABI,
        data: proposalHexdata,
      })

      const collectionAddress = decodedData.args[2] as Address

      const contractUri = await getZora1155Uri(collectionAddress)
      const response = await fetch(`/api/metadata?uri=${contractUri}`)
      const metadata = await response.json()

      return {
        collectionName: metadata?.name || '',
        collectionImage: metadata?.image || '',
        collectionDesc: metadata?.description || '',
        type: TransactionType.ZORA_COLLECT,
        title: 'Collect on Zora',
      }
    }

    if (proposalType === TransactionType.ZORA_CREATE) {
      const decodedData = decodeFunctionData({
        abi: zoraCreator1155FactoryImplABI,
        data: proposalHexdata,
      })

      let metadata
      try {
        const response = await fetch(`/api/metadata?uri=${decodedData.args[0]}`)
        metadata = await response.json()
      } catch (error) {
        metadata = null
      }

      return {
        collectionName: metadata?.name || '',
        collectionImage: metadata?.image || '',
        collectionDesc: metadata?.description || '',
        type: TransactionType.ZORA_CREATE,
        title: 'Create NFT',
      }
    }
  } catch (error) {
    return null
  }
}

export default getProposalInfo
