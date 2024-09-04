import getMaxExecutableTime from '@/lib/party/getMaxExecutableTime'
import { pad, toHex, concatHex, Address, zeroAddress } from 'viem'
import { ProposalType } from '@/types/partyTypes'
import getZoraCreateProposalBytecode from '@/lib/party/getZoraCreateProposalBytecode'
import { uploadFile } from '@/lib/ipfs-service'
import getCreatorClient from '@/lib/zora/getCreatorClient'
import FAM from '@/constants/fam'

const getZoraCreateProposalData = async (
  recipient: Address = zeroAddress,
  title: string,
  description: string,
  image: string,
  media: string,
  pricePerToken: bigint,
  editionSize: bigint | number,
  limitPerAddress: number,
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

  const creatorClient = getCreatorClient()

  const { parameters } = await creatorClient.create1155({
    contract: {
      name: title,
      uri,
    },
    token: {
      maxSupply: editionSize,
      mintToCreatorCount: limitPerAddress,
      tokenMetadataURI: uri,
      createReferral: FAM,
      salesConfig: {
        pricePerToken,
        saleStart: 0n,
        saleEnd: BigInt(duration),
      },
      payoutRecipient: payoutAddress,
    },
    account: recipient!,
  })

  const encodedBytecodeProposalData = getZoraCreateProposalBytecode(parameters)

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
