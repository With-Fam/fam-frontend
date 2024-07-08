import getMaxExecutableTime from '@/lib/party/getMaxExecutableTime'
import { pad, toHex, concatHex, Address, zeroAddress } from 'viem'
import { ProposalType } from '@/types/partyTypes'
import getZoraPurchaseProposalBytecode from '@/lib/party/getZoraPurchaseProposalBytecode'

const getZoraCollectProposalData = (
  collectionAddress: Address = zeroAddress,
  minter: Address = zeroAddress,
  recipient: Address = zeroAddress,
  ethPrice: bigint,
  tokenId: bigint = 1n
) => {
  const encodedBytecodeProposalData = getZoraPurchaseProposalBytecode(
    collectionAddress,
    minter,
    recipient,
    ethPrice,
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
