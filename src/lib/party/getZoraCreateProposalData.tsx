import getMaxExecutableTime from '@/lib/party/getMaxExecutableTime'
import { pad, toHex, concatHex, Address, zeroAddress } from 'viem'
import { ProposalType } from '@/types/partyTypes'
import getZoraCreateProposalBytecode from '@/lib/party/getZoraCreateProposalBytecode'
import { uploadFile } from '@/lib/ipfs-service'

const getZoraCreateProposalData = async (
  recipient: Address = zeroAddress,
  title: string,
  description: string,
  image: string,
  media: string,
  pricePerToken: bigint,
  editionSize: bigint | number,
  limitPerAddress: bigint | number,
  duration: number,
  payoutAddress: Address
) => {
  const jsonString = JSON.stringify({
    name: title,
    description,
    image: image || media,
    animation_url: media || image,
  })
  const metadata = new Blob([jsonString], { type: 'application/json' })
  const file = new File([metadata], 'metdata', { type: 'application/json' })
  const { uri } = await uploadFile(file)

  const encodedBytecodeProposalData = getZoraCreateProposalBytecode(
    recipient,
    uri,
    title,
    pricePerToken,
    editionSize,
    limitPerAddress,
    duration,
    payoutAddress
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

export default getZoraCreateProposalData
