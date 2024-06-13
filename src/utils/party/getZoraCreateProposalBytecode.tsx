import { Address, encodeFunctionData } from 'viem'
import {
  zoraCreator1155FactoryImplABI,
  zoraCreator1155FactoryImplAddress,
} from '@zoralabs/protocol-deployments'
import getProposalBytecode from './getProposalBytecode'
import { CHAIN_ID } from '@/constants/defaultChains'

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
    zoraCreator1155FactoryImplAddress[CHAIN_ID],
    value,
    data
  )
  return encodedBytecodeProposalData
}

export default getZoraCreateProposalBytecode
