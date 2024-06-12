import { Address, encodeFunctionData } from 'viem'
import { zoraCreator1155FactoryImplABI } from '@zoralabs/protocol-deployments'
import getProposalBytecode from './getProposalBytecode'
import { ZORA_FACTORY_PROXY } from '@/constants/addresses'

const getZoraCreateProposalBytecode = (recipient: Address) => {
  const newContractURI = 'ipfs://'
  const name = 'Based in Colombia 🇨🇴'
  const defaultRoyaltyConfiguration = {
    royaltyMintSchedule: 0,
    royaltyBPS: 500,
    royaltyRecipient: recipient,
  }
  const defaultAdmin = recipient
  const setupActions = [] as any[]
  const value = 0n
  const data = encodeFunctionData({
    abi: zoraCreator1155FactoryImplABI,
    functionName: 'createContract',
    args: [
      newContractURI,
      name,
      defaultRoyaltyConfiguration,
      defaultAdmin,
      setupActions,
    ],
  })
  const encodedBytecodeProposalData = getProposalBytecode(
    ZORA_FACTORY_PROXY,
    value,
    data
  )
  return encodedBytecodeProposalData
}

export default getZoraCreateProposalBytecode
