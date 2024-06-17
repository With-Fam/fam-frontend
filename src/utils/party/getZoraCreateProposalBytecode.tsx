import { Address, encodeFunctionData } from 'viem'
import {
  zoraCreator1155FactoryImplABI,
  zoraCreator1155FactoryImplAddress,
} from '@zoralabs/protocol-deployments'
import getProposalBytecode from './getProposalBytecode'
import { CHAIN_ID } from '@/constants/defaultChains'
import getSetupActions from '@/utils/zora/getSetupActions'

const getZoraCreateProposalBytecode = (
  recipient: Address,
  uri: string,
  name: string,
  pricePerToken: bigint,
  editionSize: bigint | number,
  limitPerAddress: bigint | number,
  duration: number,
  payoutAddress: Address
) => {
  const setupActions = getSetupActions(
    recipient,
    uri,
    pricePerToken,
    editionSize,
    limitPerAddress,
    duration,
    payoutAddress
  )

  const args = [
    uri,
    name,
    {
      royaltyMintSchedule: 0,
      royaltyBPS: 500,
      royaltyRecipient: recipient,
    },
    recipient,
    setupActions,
  ] as any

  const value = 0n
  const data = encodeFunctionData({
    abi: zoraCreator1155FactoryImplABI,
    functionName: 'createContract',
    args,
  })
  const encodedBytecodeProposalData = getProposalBytecode(
    zoraCreator1155FactoryImplAddress[CHAIN_ID],
    value,
    data
  )
  return encodedBytecodeProposalData
}

export default getZoraCreateProposalBytecode
