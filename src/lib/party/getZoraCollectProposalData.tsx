import getMaxExecutableTime from '@/lib/party/getMaxExecutableTime'
import { pad, toHex, concatHex, Address, zeroAddress } from 'viem'
import { ProposalType } from '@/types/partyTypes'
import getZoraPurchaseProposalBytecode from '@/lib/party/getZoraPurchaseProposalBytecode'

const getZoraCollectProposalData = async (
  collectionAddress: Address = zeroAddress,
  minter: Address = zeroAddress,
  recipient: Address = zeroAddress,
  price: bigint,
  tokenId: bigint = 1n
) => {
  const encodedBytecodeProposalData = await getZoraPurchaseProposalBytecode(
    collectionAddress,
    minter,
    recipient,
    price,
    tokenId
  )
  const hexEncodedSelector = pad(toHex(ProposalType.ArbitraryCalls), {
    size: 4,
  })

  const proposalData = concatHex([
    hexEncodedSelector,
    encodedBytecodeProposalData as Address,
  ])

  const proposalStruct: any = {
    cancelDelay: '0',
    maxExecutableTime: getMaxExecutableTime(),
    proposalData,
  }

  return proposalStruct
}

export default getZoraCollectProposalData
