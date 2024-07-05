import { TransactionType } from '@/modules/create-activity/types'
import getZora1155Uri from '@/lib/zora/getZora1155Uri'
import { zoraCreator1155FactoryImplABI } from '@zoralabs/protocol-deployments'
import { decodeFunctionData } from 'viem'

const getProposalInfo = async (proposal: any) => {
  try {
    const proposalData: any = proposal.proposalData[0]
    const proposalHexdata = proposalData.data

    if (proposalHexdata === '0x') {
      return {
        value: proposalData.value,
        receiver: proposalData.target,
        sender: proposal.proposerAddress,
        type: TransactionType.SEND_ETH,
        title: 'Send ETH',
      }
    }

    if (proposalHexdata.length === 650) {
      const collectionAddress = proposalData.target

      const contractUri = await getZora1155Uri(collectionAddress)
      const response = await fetch(`/api/metadata?uri=${contractUri}`)
      const metadata = await response.json()

      return {
        collectionName: metadata?.name || '',
        collectionImage: metadata?.image || '',
        collectionDesc: metadata?.description || '',
        type: TransactionType.ZORA_COLLECT,
        title: 'Zora Collect',
      }
    }

    if (proposalHexdata.length === 2762) {
      const decodedData = decodeFunctionData({
        abi: zoraCreator1155FactoryImplABI,
        data: proposalHexdata,
      })

      const response = await fetch(`/api/metadata?uri=${decodedData.args[0]}`)
      const metadata = await response.json()
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
